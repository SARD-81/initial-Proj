import React, { useState, useEffect } from "react";
import { 
  Button, Input, Textarea, 
  FormControl, FormLabel, Select, 
  Modal, ModalOverlay, ModalContent, 
  ModalHeader, ModalBody, ModalFooter, 
  ModalCloseButton, Grid 
} from "@chakra-ui/react";
import type { Task, Category } from "../types/types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "isCompleted">
  ) => void;
  categories: Category[];
  initialValues?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  initialValues,
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [category, setCategory] = useState(initialValues?.category || "");
  const [priority, setPriority] = useState<Task["priority"]>(
    initialValues?.priority || "medium"
  );

  useEffect(() => {
    if (isOpen) {
      setTitle(initialValues?.title || "");
      setDescription(initialValues?.description || "");
      setCategory(initialValues?.category || "");
      setPriority(initialValues?.priority || "medium");
    }
  }, [initialValues, isOpen]);

  const handleSubmit = () => {
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialValues?.id ? "Edit Task" : "Add New Task"}
        </ModalHeader>
        <ModalCloseButton aria-label="Close modal" />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="task-title">Title</FormLabel>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              aria-label="Task title"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="task-description">Description</FormLabel>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              aria-label="Task description"
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel htmlFor="task-category">Category</FormLabel>
              <Select
                id="task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Uncategorized"
                aria-label="Task category"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="task-priority">Priority</FormLabel>
              <Select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task["priority"])}
                aria-label="Task priority"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={2}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            variant="ghost"
            onClick={handleSubmit}
            isDisabled={!title.trim()}
          >
            {initialValues?.id ? "Update Task" : "Add Task"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;