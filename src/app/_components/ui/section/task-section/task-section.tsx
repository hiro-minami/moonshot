"use client";

import type { Objective } from "@prisma/client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { IconButton, ScrollArea } from "@radix-ui/themes";
import type { KeyResultWithTasks } from "~/types";
import { TaskCreateForm } from "../../form/task-create-form";
import { TopSection } from "./top-section";

type TaskSectionProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResultWithTasks>;
};

// done、deleteのアイコンを追加する
export const TaskSection = ({ keyResults }: TaskSectionProps) => {
  return (
    <div>
      <TopSection />
      <div className="flex flex-col gap-4 mt-4 p-4 bg-white/80 border rounded">
        <ScrollArea
          type="always"
          scrollbars="vertical"
          className="mt-2 h-[560px] px-6"
        >
          {keyResults.map((keyResult, i) => (
            <div key={i} className="pb-4">
              <span className="font-bold">{keyResult.name}</span>
              <div className="flex flex-col gap-2">
                {keyResult.tasks.map((task, j) => (
                  <div key={j} className="flex flex-row gap-3 items-center">
                    <IconButton variant="ghost">
                      <CheckCircledIcon />
                    </IconButton>
                    <span>{task.name}</span>
                  </div>
                ))}
                <TaskCreateForm keyResultId={keyResult.id} />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
