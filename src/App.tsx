import React, { useState, useEffect } from 'react';
import { 
  Box, Flex, Input, 
  useDisclosure, useBreakpointValue, IconButton, Badge, Tooltip, Icon
} from '@chakra-ui/react';
import { FaBars, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategoryForm from './components/CategoryForm';
import ToastNotification from './components/ToastNotification';
import useLocalStorage from './hooks/useLocalStorage';
import type { Task, Category } from './types/types';
import { useDarkMode } from './CustomChakraProvider';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { 
    isOpen: isTaskFormOpen, 
    onOpen: onTaskFormOpen, 
    onClose: onTaskFormClose 
  } = useDisclosure();
  
  const { 
    isOpen: isCategoryFormOpen, 
    onOpen: onCategoryFormOpen, 
    onClose: onCategoryFormClose 
  } = useDisclosure();
  
  const [toast, setToast] = useState<{
    message: string;
    status: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
    setSidebarOpen(!sidebarOpen);
  };

  const getCategoryName = () => {
    if (selectedCategory === 'completed') return 'Completed Tasks';
    if (selectedCategory === 'uncategorized') return 'Uncategorized Tasks';
    if (selectedCategory === 'all') return 'All Tasks';
    
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? `${category.name} Tasks` : 'All Tasks';
  };

  return (
    <Flex h="100vh" overflow="hidden" bg={isDark ? "gray.800" : "gray.50"}>
      {toast && (
        <Box position="fixed" bottom="4" right="4" zIndex="toast">
          <ToastNotification 
            message={toast.message} 
            status={toast.status} 
            onClose={() => setToast(null)}
          />
        </Box>
      )}
      
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        categories={categories}
        onAddCategory={onCategoryFormOpen}
        onAddTask={() => {
          setEditingTask(null);
          onTaskFormOpen();
        }}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <Flex direction="column" flex="1" overflow="hidden">
        <Flex 
          bg={isDark ? "gray.700" : "white"}
          borderBottom="1px"
          borderColor={isDark ? "gray.600" : "gray.200"}
          p="4" 
          align="center" 
          justify="space-between"
        >
          {isMobile && (
            <IconButton
              aria-label="Toggle sidebar"
              icon={<FaBars />}
              variant="ghost"
              onClick={toggleSidebar}
              color={isDark ? "white" : "gray.600"}
              fontSize="xl"
            />
          )}
          
          <Box flex="1" maxW="2xl" mx="4">
            <Box position="relative">
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                pl="10"
                bg={isDark ? "gray.600" : "white"}
                borderColor={isDark ? "gray.600" : "gray.200"}
                color={isDark ? "white" : "gray.800"}
                _hover={{ borderColor: isDark ? "gray.500" : "gray.300" }}
                _focus={{ 
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                }}
                aria-label="Search tasks"
              />
              <Icon 
                as={FaSearch} 
                position="absolute" 
                left="3" 
                top="50%" 
                transform="translateY(-50%)" 
                color={isDark ? "gray.400" : "gray.400"}
              />
            </Box>
          </Box>
          
          <Flex align="center" gap={3}>
            <Tooltip label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton
                aria-label="Toggle dark mode"
                icon={isDark ? <FaSun /> : <FaMoon />}
                variant="ghost"
                onClick={toggleDarkMode}
                color={isDark ? "brand.200" : "brand.500"}
              />
            </Tooltip>
            
            <Box display={{ base: 'none', md: 'block' }}>
              <Badge 
                colorScheme="brand"
                fontSize="sm"
                fontWeight="medium"
                px="3" 
                py="1" 
                borderRadius="md"
              >
                {getCategoryName()}
              </Badge>
            </Box>
          </Flex>
        </Flex>
        
        <Box 
          flex="1" 
          overflowY="auto" 
          p="4" 
          bg={isDark ? "gray.800" : "gray.50"}
        >
          <TaskList
            tasks={filteredTasks}
            onEditTask={(task) => {
              setEditingTask(task);
              onTaskFormOpen();
            }}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              if (task) {
                handleUpdateTask(taskId, { isCompleted: !task.isCompleted });
              }
            }}
          />
        </Box>
      </Flex>
      
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          onTaskFormClose();
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
        isOpen={isCategoryFormOpen}
        onClose={onCategoryFormClose}
        onSubmit={handleAddCategory}
      />
      
      {isMobile && sidebarOpen && (
        <Box 
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          zIndex="overlay"
          onClick={toggleSidebar}
        />
      )}
    </Flex>
  );
};

export default App;