import type { Task } from "@prisma/client";

export const groupTasksByDate = (tasks: Array<Task>) => {
  return tasks.reduce(
    (acc, task) => {
      const date = task.endDate!.toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]?.push(task);
      return acc;
    },
    {} as Record<string, Array<Task>>,
  );
};

export const countTasksByDate = (tasksByDate: Record<string, Array<Task>>) => {
  return Object.entries(tasksByDate)
    .map(([date, tasks]) => ({
      date,
      count: tasks.length,
    }))
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1));
};
