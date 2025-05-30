import React from 'react';
import { FaTasks, FaPlus, FaFolderPlus, FaInbox, FaTag, FaCheckCircle } from 'react-icons/fa';
import type { Category } from '../types/types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onAddTask: () => void;
  onAddCategory: () => void;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  onAddTask, 
  onAddCategory, 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className={`sidebar bg-white w-64 border-r border-gray-200 flex flex-col ${isOpen ? 'open' : ''}`}>
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
          <FaTasks className="mr-2" aria-hidden="true" /> TaskMaster
        </h1>
      </div>

      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onAddTask}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center mb-2"
          aria-label="Add new task"
        >
          <FaPlus className="mr-2" aria-hidden="true" /> Add Task
        </button>
        <button
          onClick={onAddCategory}
          className="w-full bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md flex items-center justify-center"
          aria-label="Add new category"
        >
          <FaFolderPlus className="mr-2" aria-hidden="true" /> Add Category
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onSelectCategory('all')}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 flex items-center ${
                  selectedCategory === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                }`}
                aria-label="Show all tasks"
              >
                <FaInbox className="mr-2 text-indigo-500" aria-hidden="true" /> All Tasks
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('uncategorized')}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 flex items-center ${
                  selectedCategory === 'uncategorized' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                }`}
                aria-label="Show uncategorized tasks"
              >
                <FaTag className="mr-2 text-gray-500" aria-hidden="true" /> Uncategory
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('completed')}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 flex items-center ${
                  selectedCategory === 'completed' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                }`}
                aria-label="Show completed tasks"
              >
                <FaCheckCircle className="mr-2 text-green-500" aria-hidden="true" /> Completed
              </button>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 flex items-center ${
                    selectedCategory === category.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                  }`}
                  aria-label={`Show tasks in ${category.name} category`}
                >
                  <FaTag className="mr-2 text-indigo-500" aria-hidden="true" /> {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 md:hidden">
        <button
          onClick={toggleSidebar}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
          aria-label="Close menu"
        >
          Close Menu
        </button>
      </div>
    </div>
  );
};

export default Sidebar;