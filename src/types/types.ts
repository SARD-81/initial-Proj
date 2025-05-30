export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
}

export type PriorityColors = {
  high: string;
  medium: string;
  low: string;
};

export const getPriorityColor = (
  priority: "high" | "medium" | "low",
  isDark: boolean
): string => {
  const colors: PriorityColors = {
    high: isDark ? "red.500" : "red.500",
    medium: isDark ? "yellow.500" : "yellow.500",
    low: isDark ? "green.500" : "green.500",
  };

  return colors[priority];
};
