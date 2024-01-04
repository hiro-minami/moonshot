"use client";

import { Grid } from "@radix-ui/themes";
import { Chart, registerables } from "chart.js";
import { CompletedTaskCountCard } from "~/app/_components/ui/card/completed-task-count-card";
import { CompletedTaskRateCard } from "~/app/_components/ui/card/completed-task-rate-card";
import { KeyResultCard } from "~/app/_components/ui/card/key-result-card";
import { TaskCard } from "~/app/_components/ui/card/task-card";
import { TaskListCard } from "~/app/_components/ui/card/task-list-card";
import { useTaskMetrics } from "~/hooks";
import type { KeyResultWithTasks } from "~/types";

type PageContentProps = {
  keyResult: KeyResultWithTasks;
};

Chart.register(...registerables);

export const PageContent = ({ keyResult }: PageContentProps) => {
  const {
    taskCount,
    finishTaskCount,
    dates,
    counts,
    progressRate,
    unfinishedTaskCount,
    taskCompletionRate,
  } = useTaskMetrics(keyResult);

  return (
    <div className="flex flex-col gap-4">
      <KeyResultCard
        keyResult={keyResult}
        progressRate={progressRate}
        readonly={true}
      />
      <Grid columns="4" gap="4" className="w-[60%]">
        <TaskCard name="タスク数" count={taskCount} />
        <TaskCard name="未完了のタスク" count={unfinishedTaskCount} />
        <TaskCard name="完了したタスク" count={finishTaskCount} />
        <TaskCard name="タスクの消化率" count={taskCompletionRate} unit="%" />
      </Grid>
      <div className="grid grid-cols-10 gap-3">
        <CompletedTaskCountCard dates={dates} counts={counts} />
        <CompletedTaskRateCard
          taskCount={taskCount}
          finishTaskCount={finishTaskCount}
        />
      </div>
      <TaskListCard keyResult={keyResult} />
    </div>
  );
};
