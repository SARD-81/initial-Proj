import React from 'react';
import { Badge, useColorMode } from '@chakra-ui/react';

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  const priorityStyles = {
    high: {
      colorScheme: 'red',
      text: 'High',
      bg: isDark ? 'red.900' : 'red.100',
      color: isDark ? 'red.200' : 'red.800'
    },
    medium: {
      colorScheme: 'yellow',
      text: 'Medium',
      bg: isDark ? 'yellow.900' : 'yellow.100',
      color: isDark ? 'yellow.200' : 'yellow.800'
    },
    low: {
      colorScheme: 'green',
      text: 'Low',
      bg: isDark ? 'green.900' : 'green.100',
      color: isDark ? 'green.200' : 'green.800'
    }
  };
  
  const style = priorityStyles[priority];
  
  return (
    <Badge
      colorScheme={style.colorScheme}
      bg={style.bg}
      color={style.color}
      variant="solid"
      fontSize="xs"
      px="2"
      py="0.5"
      borderRadius="full"
    >
      {style.text}
    </Badge>
  );
};

export default PriorityBadge;