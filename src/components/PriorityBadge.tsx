import React from 'react';

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  
  const priorityText = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityClasses[priority]}`}>
      {priorityText[priority]}
    </span>
  );
};

export default PriorityBadge;