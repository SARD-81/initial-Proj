import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { CloseButton } from "@chakra-ui/close-button";
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

  // Reset form state whenever the modal opens or initialValues change
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
        <CloseButton
          onClick={onClose}
          position="absolute"
          top="8px"
          right="8px"
          aria-label="Close modal"
        />
        <ModalBody className="space-y-4">
          <FormControl isRequired>
            <FormLabel htmlFor="titleInput">Title</FormLabel>
            <Input
              id="titleInput"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Task title"
              aria-required="true"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="descriptionTextarea">Description</FormLabel>
            <Textarea
              id="descriptionTextarea"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              placeholder="Task description"
              rows={3}
            />
          </FormControl>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            <FormControl>
              <FormLabel id="category-label" htmlFor="categorySelect">
                Category
              </FormLabel>
              <Select
                id="categorySelect"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCategory(e.target.value)
                }
                aria-labelledby="category-label"
                aria-label="Task category"
                title="Select task category"
                placeholder="Uncategorized"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel id="priority-label" htmlFor="prioritySelect">
                Priority
              </FormLabel>
              <Select
                id="prioritySelect"
                value={priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPriority(e.target.value as Task["priority"])
                }
                aria-labelledby="priority-label"
                aria-label="Task priority"
                title="Select task priority"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={2}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            disabled={!title.trim()}
            aria-disabled={!title.trim()}
          >
            {initialValues?.id ? "Update Task" : "Add Task"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;