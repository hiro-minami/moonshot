import { CheckCircle } from "@phosphor-icons/react";
import type { Task } from "@prisma/client";
import { Tooltip } from "@radix-ui/themes";
import { DueDatePicker } from "./duedate-picker";

type TaskItemProps = {
  task: Task;
  onClick: (taskId: number) => void;
};

export const TaskItem = ({ task, onClick }: TaskItemProps) => {
  if (task.isDone) return null;
  const today = new Date();
  const fontColor =
    task.dueDate && task.dueDate < today ? "#EF4444" : "#9CA3AF";
  return (
    <div
      key={task.id}
      className="flex flex-row gap-2 items-center justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <Tooltip content="完了する" delayDuration={100}>
          <CheckCircle
            size={20}
            onClick={() => onClick(task.id)}
            className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
          />
        </Tooltip>
        <span>{task.name}</span>
      </div>
      {task.dueDate ? (
        <span className="text-sm " style={{ color: fontColor }}>
          {task.dueDate.toLocaleDateString()}
        </span>
      ) : (
        <DueDatePicker taskId={task.id} />
      )}
    </div>
  );
};
