import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types/types';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask,
  onToggleComplete 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 max-w-3xl mx-auto">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <i className="fas fa-tasks text-2xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks found</h3>
        <p className="text-gray-500">Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task.id)}
          onToggleComplete={() => onToggleComplete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;