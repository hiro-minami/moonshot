import { Card, ScrollArea } from "@radix-ui/themes";
import type { KeyResultWithTasks } from "~/types";
import { TaskItem } from "../../section/task-section/task-item";

type TaskListCardProps = {
  keyResult: KeyResultWithTasks;
};

export const TaskListCard = ({ keyResult }: TaskListCardProps) => {
  return (
    <Card>
      <ScrollArea type="always" scrollbars="vertical" className="p-6 bg-white">
        <div className="flex flex-col gap-2">
          {keyResult.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onClick={() => console.log("click")}
              readonly
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
