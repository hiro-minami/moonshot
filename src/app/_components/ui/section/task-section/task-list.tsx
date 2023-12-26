import { ScrollArea } from "@radix-ui/themes";
import type { KeyResultWithTasks } from "~/types";
import { TaskCreateForm } from "../../form/task-create-form";
import { TaskItem } from "./task-item";

type TaskListProps = {
  keyResults: ReadonlyArray<KeyResultWithTasks>;
  onClick: (taskId: number) => void;
};

export const TaskList = ({ keyResults, onClick }: TaskListProps) => {
  const height = window.innerHeight - 244;
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="mt-2 px-6 overflow-y-scroll"
      style={{ height: height }}
    >
      {keyResults.map((keyResult) => (
        <div key={keyResult.id} className="pb-4 flex flex-col gap-2">
          <span className="font-bold">{keyResult.name}</span>
          <div className="flex flex-col gap-2">
            {keyResult.tasks.map((task) => (
              <TaskItem key={task.id} task={task} onClick={onClick} />
            ))}
            <TaskCreateForm keyResultId={keyResult.id} />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
