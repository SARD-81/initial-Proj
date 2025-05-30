import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types/types';
import { Box, Text, useColorMode, VStack } from '@chakra-ui/react';

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
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py="12" maxW="3xl" mx="auto">
        <Box 
          bg={isDark ? "gray.600" : "gray.200"} 
          border="2px" 
          borderStyle="dashed" 
          borderRadius="xl" 
          w="16" 
          h="16" 
          mx="auto" 
          mb="4" 
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box 
            as="i" 
            className="fas fa-tasks" 
            fontSize="2xl" 
            color={isDark ? "gray.400" : "gray.400"}
            aria-hidden="true"
          ></Box>
        </Box>
        <Text fontSize="lg" fontWeight="medium" color={isDark ? "gray.300" : "gray.700"} mb="1">
          No tasks found
        </Text>
        <Text color={isDark ? "gray.500" : "gray.500"}>
          Create a new task to get started
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={3} maxW="3xl" mx="auto" align="stretch">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task.id)}
          onToggleComplete={() => onToggleComplete(task.id)}
        />
      ))}
    </VStack>
  );
};

export default TaskList;