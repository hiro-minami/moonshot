"use client";

import type { Objective } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";
import type { KeyResultWithTasks } from "~/types";
import { TaskList } from "./task-list";
import { TopSection } from "./top-section";

type TaskSectionProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResultWithTasks>;
};

export const TaskSection = ({ keyResults }: TaskSectionProps) => {
  const router = useRouter();
  const openToast = useToast();

  const { mutate } = api.task.finishTask.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `タスクを完了しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `タスクを完了できませんでした。${error.message}`,
      });
    },
  });

  const handleFinishTask = useCallback(
    (taskId: number) => {
      mutate({ id: taskId });
    },
    [mutate],
  );
  return (
    <div className="col-span-2">
      <TopSection />
      <div className="flex flex-col gap-4 mt-4 p-4 bg-white/80 border rounded">
        <TaskList keyResults={keyResults} onClick={handleFinishTask} />
      </div>
    </div>
  );
};
