import React from 'react';
import { 
  Box, Heading, Button, Text, 
  Icon, useBreakpointValue, List, ListItem 
} from '@chakra-ui/react';
import { 
  FaTasks, FaPlus, FaFolderPlus, 
  FaInbox, FaTag, FaCheckCircle 
} from 'react-icons/fa';
import type { Category } from '../types/types';
import { useDarkMode } from '../CustomChakraProvider';

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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isDark } = useDarkMode();
  
  const bgColor = isDark ? "gray.700" : "white";
  const borderColor = isDark ? "gray.600" : "gray.200";
  const textColor = isDark ? "gray.200" : "gray.700";
  const hoverBg = isDark ? "gray.600" : "gray.100";
  const selectedBg = isDark ? "brand.900" : "brand.50";
  const selectedColor = isDark ? "brand.200" : "brand.600";

  const handleCategorySelect = (id: string) => {
    onSelectCategory(id);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Box
      w="64"
      borderRight="1px"
      borderColor={borderColor}
      flexDirection="column"
      bg={bgColor}
      display={isMobile ? (isOpen ? "flex" : "none") : "flex"}
      position={isMobile ? "fixed" : "relative"}
      zIndex={isMobile ? "modal" : "auto"}
      h="100vh"
      transform={isMobile ? (isOpen ? "translateX(0)" : "translateX(-100%)") : undefined}
      transition="transform 0.3s ease"
    >
      <Box p="4" borderBottom="1px" borderColor={borderColor}>
        <Heading as="h1" size="lg" color="brand.500" display="flex" alignItems="center">
          <Icon as={FaTasks} mr="2" aria-hidden="true" /> TaskMaster
        </Heading>
      </Box>

      <Box p="4" borderBottom="1px" borderColor={borderColor}>
        <Button
          onClick={() => {
            onAddTask();
            if (isMobile) toggleSidebar();
          }}
          w="full"
          variant="outline"
          colorScheme="brand"
          mb="2"
          leftIcon={<FaPlus />}
          aria-label="Add new task"
        >
          Add Task
        </Button>
        <Button
          onClick={() => {
            onAddCategory();
            if (isMobile) toggleSidebar();
          }}
          w="full"
          variant="outline"
          colorScheme="brand"
          leftIcon={<FaFolderPlus />}
          aria-label="Add new category"
        >
          Add Category
        </Button>
      </Box>

      <Box flex="1" overflowY="auto">
        <Box p="4">
          <Text 
            fontSize="xs" 
            fontWeight="semibold" 
            color={isDark ? "gray.400" : "gray.500"} 
            textTransform="uppercase" 
            letterSpacing="wider" 
            mb="2"
          >
            Categories
          </Text>
          <List spacing="1">
            <ListItem>
              <Button
                onClick={() => handleCategorySelect('all')}
                w="full"
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FaInbox color="brand.500" />}
                bg={selectedCategory === 'all' ? selectedBg : 'transparent'}
                color={selectedCategory === 'all' ? selectedColor : textColor}
                _hover={{ bg: hoverBg }}
                aria-label="Show all tasks"
              >
                All Tasks
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => handleCategorySelect('uncategorized')}
                w="full"
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FaTag color="gray.500" />}
                bg={selectedCategory === 'uncategorized' ? selectedBg : 'transparent'}
                color={selectedCategory === 'uncategorized' ? selectedColor : textColor}
                _hover={{ bg: hoverBg }}
                aria-label="Show uncategorized tasks"
              >
                Uncategory
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => handleCategorySelect('completed')}
                w="full"
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FaCheckCircle color="green.500" />}
                bg={selectedCategory === 'completed' ? selectedBg : 'transparent'}
                color={selectedCategory === 'completed' ? selectedColor : textColor}
                _hover={{ bg: hoverBg }}
                aria-label="Show completed tasks"
              >
                Completed
              </Button>
            </ListItem>
            {categories.map(category => (
              <ListItem key={category.id}>
                <Button
                  onClick={() => handleCategorySelect(category.id)}
                  w="full"
                  justifyContent="flex-start"
                  variant="ghost"
                  leftIcon={<FaTag color="brand.500" />}
                  bg={selectedCategory === category.id ? selectedBg : 'transparent'}
                  color={selectedCategory === category.id ? selectedColor : textColor}
                  _hover={{ bg: hoverBg }}
                  aria-label={`Show tasks in ${category.name} category`}
                >
                  {category.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {isMobile && (
        <Box p="4" borderTop="1px" borderColor={borderColor}>
          <Button
            onClick={toggleSidebar}
            w="full"
            variant="ghost"
            colorScheme="gray"
          >
            Close Menu
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;