import type { Task } from "@prisma/client";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { DueDatePicker } from "./duedate-picker";

type TaskItemProps = {
  task: Task;
  onClick: (taskId: number) => void;
};

export const TaskItem = ({ task, onClick }: TaskItemProps) => {
  if (task.isDone) return null;
  return (
    <div
      key={task.id}
      className="flex flex-row gap-2 items-center justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <CheckCircledIcon
          onClick={() => onClick(task.id)}
          className="cursor-pointer text-[#E5E7EB] hover:text-[#9f53ec]"
        />
        <span>{task.name}</span>
      </div>
      <DueDatePicker />
    </div>
  );
};
