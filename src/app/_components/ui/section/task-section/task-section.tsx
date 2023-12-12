"use client";

import type { Objective } from "@prisma/client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import type { KeyResultWithTasks } from "~/types";
import { TaskCreateForm } from "../../form/task-create-form";
import { TopSection } from "./top-section";

type TaskSectionProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResultWithTasks>;
};

// TODO: deleteのアイコンを追加する
// TODO: コンポーネント分ける
export const TaskSection = ({ keyResults }: TaskSectionProps) => {
  const router = useRouter();

  const { mutate } = api.task.finishTask.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleFinishTask = useCallback(
    (taskId: number) => {
      mutate({ id: taskId });
    },
    [mutate],
  );
  return (
    <div>
      <TopSection />
      <div className="flex flex-col gap-4 mt-4 p-4 bg-white/80 border rounded">
        <ScrollArea
          type="always"
          scrollbars="vertical"
          className="mt-2 h-[560px] px-6"
        >
          {keyResults.map((keyResult) => (
            <div key={keyResult.id} className="pb-4">
              <span className="font-bold">{keyResult.name}</span>
              <div className="flex flex-col gap-2">
                {keyResult.tasks.map(
                  (task) =>
                    !task.isDone && (
                      <div
                        key={task.id}
                        className="flex flex-row gap-2 items-center"
                      >
                        <CheckCircledIcon
                          onClick={() => handleFinishTask(task.id)}
                          className="cursor-pointer text-[#E5E7EB] hover:text-[#9f53ec]"
                        />
                        <span>{task.name}</span>
                      </div>
                    ),
                )}
                <TaskCreateForm keyResultId={keyResult.id} />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
