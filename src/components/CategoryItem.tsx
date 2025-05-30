import React from 'react';
import { FiFolder } from 'react-icons/fi';

interface CategoryItemProps {
  name: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  name, 
  icon = <FiFolder />,
  isSelected,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${isSelected 
          ? 'bg-blue-100 text-blue-800' 
          : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="mr-2 text-gray-500">{icon}</span>
      <span className="truncate">{name}</span>
    </button>
  );
};

export default CategoryItem;