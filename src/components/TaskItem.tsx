import React from 'react';
import { 
  Box, Flex, Text, Badge, 
  IconButton, useColorMode 
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
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
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  // Priority colors
  const priorityColors = {
    high: {
      border: 'red.500',
      badge: 'red',
      bg: isDark ? 'red.900' : 'red.100',
      text: isDark ? 'red.200' : 'red.800'
    },
    medium: {
      border: 'yellow.500',
      badge: 'yellow',
      bg: isDark ? 'yellow.900' : 'yellow.100',
      text: isDark ? 'yellow.200' : 'yellow.800'
    },
    low: {
      border: 'green.500',
      badge: 'green',
      bg: isDark ? 'green.900' : 'green.100',
      text: isDark ? 'green.200' : 'green.800'
    }
  };
  
  const currentPriority = priorityColors[task.priority];
  
  const bgColor = isDark ? 'gray.700' : 'white';
  const borderColor = isDark ? 'gray.600' : 'gray.200';
  const textColor = isDark ? 'white' : 'gray.800';
  const descriptionColor = isDark ? 'gray.400' : 'gray.600';
  const dateColor = isDark ? 'gray.500' : 'gray.500';
  const completedTextColor = isDark ? 'gray.500' : 'gray.500';
  
  return (
    <Box 
      bg={bgColor}
      borderRadius="md" 
      boxShadow="sm" 
      border="1px" 
      borderLeft="4px"
      borderColor={borderColor}
      borderLeftColor={currentPriority.border}
      p="4" 
      _hover={{ boxShadow: 'md' }}
      transition="box-shadow 0.2s"
    >
      <Flex align="flex-start" justify="space-between">
        <Flex align="flex-start" gap="3" w="full">
          <IconButton
            aria-label={task.isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
            icon={task.isCompleted ? <FiCheck size="14px" /> : undefined}
            variant="unstyled"
            size="sm"
            mt="0.5"
            flexShrink={0}
            w="5"
            h="5"
            borderRadius="full"
            border="2px"
            borderColor={task.isCompleted ? currentPriority.border : isDark ? 'gray.500' : 'gray.300'}
            bg={task.isCompleted ? currentPriority.border : 'transparent'}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ borderColor: currentPriority.border }}
            onClick={onToggleComplete}
          />
          
          <Box flexGrow={1} w="full">
            <Flex direction={{ base: 'column', sm: 'row' }} gap="2" justify="space-between" align={{ sm: 'center' }}>
              <Text 
                fontWeight="medium" 
                textDecoration={task.isCompleted ? 'line-through' : 'none'}
                color={task.isCompleted ? completedTextColor : textColor}
              >
                {task.title}
              </Text>
              <Flex gap="2">
                <Badge 
                  variant="solid"
                  colorScheme={currentPriority.badge}
                  fontSize="xs"
                  px="2"
                  py="0.5"
                  borderRadius="full"
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                {task.category && (
                  <Badge 
                    variant="outline"
                    colorScheme="brand"
                    fontSize="xs"
                    px="2"
                    py="0.5"
                    borderRadius="full"
                  >
                    {task.category}
                  </Badge>
                )}
              </Flex>
            </Flex>
            
            {task.description && (
              <Text 
                mt="2" 
                color={descriptionColor} 
                fontSize="sm"
                textDecoration={task.isCompleted ? 'line-through' : 'none'}
              >
                {task.description}
              </Text>
            )}
            
            <Text mt="2" fontSize="xs" color={dateColor}>
              {task.updatedAt 
                ? `Edited on ${format(parseISO(task.updatedAt), 'MMM d, yyyy h:mm a')}` 
                : `Added on ${format(parseISO(task.createdAt), 'MMM d, yyyy h:mm a')}`}
            </Text>
          </Box>
        </Flex>
        
        <Flex gap="2" ml="2">
          <IconButton
            aria-label="Edit task"
            icon={<FiEdit2 />}
            variant="ghost"
            size="sm"
            color={isDark ? "gray.400" : "gray.500"}
            _hover={{ color: currentPriority.border, bg: currentPriority.bg }}
            onClick={onEdit}
          />
          <IconButton
            aria-label="Delete task"
            icon={<FiTrash2 />}
            variant="ghost"
            size="sm"
            color={isDark ? "gray.400" : "gray.500"}
            _hover={{ color: 'red.500', bg: isDark ? 'red.900' : 'red.100' }}
            onClick={onDelete}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TaskItem;