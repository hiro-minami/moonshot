"use client";

import { ScrollArea } from "@radix-ui/themes";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { TaskItem } from "~/app/_components/ui/section/task-section/task-item";
import type { KeyResultWithTasks } from "~/types";

type PageContentProps = {
  keyResult: KeyResultWithTasks;
};

export const PageContent = ({ keyResult }: PageContentProps) => {
  const taskCount = keyResult.tasks.length;
  const finishTaskCount = keyResult.tasks.filter((task) => task.isDone).length;

  // 1. 完了したタスクだけをフィルタリング
  const completedTasks = keyResult.tasks.filter(
    (task) => task.isDone && task.endDate,
  );

  // 2. タスクを完了日でグループ化
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

  // 3. 各日付のタスク数を計算
  const taskCountsByDate = Object.entries(tasksByDate).map(([date, tasks]) => ({
    date,
    count: tasks.length,
  }));

  const dates = taskCountsByDate.map((task) => task.date);
  const counts = taskCountsByDate.map((task) => task.count);

  console.log(taskCountsByDate);

  Chart.register(...registerables);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {keyResult.name}
      </div>
      <div>必要なタスク：{taskCount}</div>
      <div>完了したタスク：{finishTaskCount}</div>
      <div className="w-[100%] y-[500px]">
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "完了したタスク",
                data: counts,
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          }}
        />
      </div>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        className="mt-2 p-6 bg-white"
      >
        {keyResult.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => console.log("click")}
          />
        ))}
      </ScrollArea>
    </>
  );
};
