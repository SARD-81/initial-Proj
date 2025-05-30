import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import ToastNotification from './components/ToastNotification';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import CategoryForm from './components/CategoryForm';
import type { Task, Category } from './types/types';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Custom toast state
  const [toast, setToast] = useState<{
    message: string;
    status: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Filter tasks based on selected category and search query
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'completed' 
      ? task.isCompleted 
      : selectedCategory === 'uncategorized' 
        ? !task.category 
        : selectedCategory === 'all'
          ? true
          : task.category === selectedCategory;
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    showToast('Task added successfully!', 'success');
  };

  const handleUpdateTask = (id: string, taskData: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            ...taskData, 
            updatedAt: new Date().toISOString() 
          } 
        : task
    ));
    
    if (taskData.isCompleted !== undefined) {
      showToast(
        taskData.isCompleted 
          ? 'Task marked as completed!' 
          : 'Task marked as active!',
        'success'
      );
    } else {
      showToast('Task updated successfully!', 'success');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    showToast('Task deleted successfully!', 'error');
  };

  const handleAddCategory = (name: string) => {
    if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
      showToast('Category already exists!', 'error');
      return;
    }
    
    setCategories([...categories, { id: Date.now().toString(), name }]);
    showToast('Category added successfully!', 'success');
  };

  const showToast = (message: string, status: 'success' | 'error') => {
    setToast({
      message,
      status,
      visible: true
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getCategoryName = () => {
    if (selectedCategory === 'completed') return 'Completed Tasks';
    if (selectedCategory === 'uncategorized') return 'Uncategorized Tasks';
    if (selectedCategory === 'all') return 'All Tasks';
    
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? `${category.name} Tasks` : 'All Tasks';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <ToastNotification 
            message={toast.message} 
            status={toast.status} 
            onClose={() => setToast(null)}
          />
        </div>
      )}
      
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        categories={categories}
        onAddCategory={() => setShowCategoryForm(true)}
        onAddTask={() => {
          setEditingTask(null);
          setShowTaskForm(true);
        }}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-600"
            aria-label="Toggle sidebar menu"
          >
            <i className="fas fa-bars text-xl" aria-hidden="true"></i>
          </button>
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Search tasks"
              />
              <i 
                className="fas fa-search absolute left-3 top-3 text-gray-400" 
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="flex items-center">
            <div 
              className="hidden md:block text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md"
              aria-live="polite"
            >
              {getCategoryName()}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <TaskList
            tasks={filteredTasks}
            onEditTask={(task) => {
              setEditingTask(task);
              setShowTaskForm(true);
            }}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              if (task) {
                handleUpdateTask(taskId, { isCompleted: !task.isCompleted });
              }
            }}
          />
        </div>
      </div>
      
      <TaskForm
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        onSubmit={(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => 
          editingTask
            ? handleUpdateTask(editingTask.id, taskData)
            : handleAddTask(taskData)
        }
        categories={categories}
        initialValues={editingTask || undefined}
      />
      
      <CategoryForm
        isOpen={showCategoryForm}
        onClose={() => setShowCategoryForm(false)}
        onSubmit={handleAddCategory}
      />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="overlay open md:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default App;