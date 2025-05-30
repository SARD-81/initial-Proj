// components/TaskItem.tsx
import React from 'react';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import PriorityBadge from './PriorityBadge';
import { format, parseISO } from 'date-fns';
import type { Task } from '../types/types';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 w-full">
          <button 
            onClick={onToggleComplete}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${task.isCompleted 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300 hover:border-gray-400'}`}
            aria-label={task.isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
          >
            {task.isCompleted && <FiCheck className="text-white text-xs" />}
          </button>
          
          <div className="flex-grow w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <div className="flex space-x-2">
                <PriorityBadge priority={task.priority} />
                {task.category && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {task.category}
                  </span>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className={`mt-2 text-gray-600 text-sm ${task.isCompleted ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span>
                {task.updatedAt 
                  ? `Edited on ${format(parseISO(task.updatedAt), 'MMM d, yyyy h:mm a')}` 
                  : `Added on ${format(parseISO(task.createdAt), 'MMM d, yyyy h:mm a')}`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-2">
          <button 
            onClick={onEdit}
            className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Edit task"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            onClick={onDelete}
            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete task"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;