import React from 'react';
import { 
  Box, Text, Icon, IconButton,
  useColorMode 
} from '@chakra-ui/react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

interface ToastNotificationProps {
  message: string;
  status: 'success' | 'error';
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  message, 
  status,
  onClose 
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  return (
    <Box
      p="4"
      borderRadius="lg"
      boxShadow="lg"
      maxW="md"
      display="flex"
      alignItems="flex-start"
      bg={status === 'success' ? 
          (isDark ? 'brand.900' : 'brand.50') : 
          (isDark ? 'red.900' : 'red.50')}
      border="1px"
      borderColor={status === 'success' ? 
          (isDark ? 'brand.500' : 'brand.500') : 
          (isDark ? 'red.700' : 'red.200')}
      animation="slideIn 0.5s, fadeOut 0.5s 3.5s"
    >
      <Icon 
        as={status === 'success' ? FiCheckCircle : FiXCircle} 
        mt="0.5" 
        mr="3" 
        flexShrink={0} 
        color={status === 'success' ? 'brand.500' : 'red.500'} 
        boxSize="5"
      />
      <Box flex="1">
        <Text color={isDark ? 'white' : 'gray.800'}>{message}</Text>
      </Box>
      <IconButton
        aria-label="Close notification"
        icon={<FiX />}
        size="sm"
        variant="ghost"
        color={isDark ? 'gray.400' : 'gray.500'}
        _hover={{ color: isDark ? 'gray.200' : 'gray.700' }}
        onClick={onClose}
        ml="4"
      />
    </Box>
  );
};

export default ToastNotification;