"use client";

import { Card, Grid, ScrollArea, Tooltip } from "@radix-ui/themes";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { KeyResultCard } from "~/app/_components/ui/card/key-result-card";
import { TaskCard } from "~/app/_components/ui/card/task-card";
import { TaskItem } from "~/app/_components/ui/section/task-section/task-item";
import type { KeyResultWithTasks } from "~/types";

type PageContentProps = {
  keyResult: KeyResultWithTasks;
};

export const PageContent = ({ keyResult }: PageContentProps) => {
  const taskCount = keyResult.tasks.length;
  const finishTaskCount = keyResult.tasks.filter((task) => task.isDone).length;

  const completedTasks = keyResult.tasks.filter(
    (task) => task.isDone && task.endDate,
  );

  // TODO: 完了日がないタスクをどうするか考える
  const tasksByDate = completedTasks.reduce(
    (acc, task) => {
      const date = task.endDate!.toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]!.push(task);

      return acc;
    },
    {} as Record<string, typeof completedTasks>,
  );

  const taskCountsByDate = Object.entries(tasksByDate).map(([date, tasks]) => ({
    date,
    count: tasks.length,
  }));

  const dates = taskCountsByDate.map((task) => task.date);
  const counts = taskCountsByDate.map((task) => task.count);

  Chart.register(...registerables);

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    lineTension: 0.4,
  };

  const width = window.innerWidth;

  const progressRate = Math.round(
    (keyResult.currentValue / keyResult.targetValue) * 100,
  );

  return (
    <div className="flex flex-col gap-4">
      <KeyResultCard {...{ keyResult, progressRate, readonly: true }} />
      <Grid columns="4" gap="4" className="w-[60%]">
        <TaskCard name="タスク数" count={taskCount} />
        <TaskCard name="未完了のタスク" count={taskCount - finishTaskCount} />
        <TaskCard name="完了したタスク" count={finishTaskCount} />
      </Grid>
      <div className="grid grid-cols-10 gap-3">
        <Card className="flex flex-col gap-2 bg-white col-span-7">
          <span>完了したタスク数の推移</span>
          <Line
            width={width / 1.6}
            height={300}
            data={{
              labels: dates,
              datasets: [
                {
                  label: "完了したタスク",
                  data: counts,
                  fill: false,
                  backgroundColor: "#9f53ec",
                  borderColor: "rgba(159, 83, 236, 0.2)",
                },
              ],
            }}
            options={options}
          />
        </Card>
        <Card className="h-[348px] col-span-3">
          <div className="flex flex-col gap-[8px] bg-white">
            <span>タスクの消化率</span>
            <Tooltip
              content={`${Math.floor((finishTaskCount / taskCount) * 100)}%`}
            >
              <div
                className="flex justify-center items-center mr-auto ml-auto w-[280px] h-[280px] rounded-[50%] ml-[49px] mr-[49px]"
                style={{
                  backgroundImage: `radial-gradient(#f2f2f2 60%, transparent 61%), conic-gradient(#9f53ec 0% ${Math.floor(
                    (finishTaskCount / taskCount) * 100,
                  )}%, #d9d9d9 60% 100%)`,
                }}
              />
            </Tooltip>
          </div>
        </Card>
      </div>
      <Card>
        <ScrollArea
          type="always"
          scrollbars="vertical"
          className="p-6 bg-white"
        >
          {keyResult.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onClick={() => console.log("click")}
            />
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
};
