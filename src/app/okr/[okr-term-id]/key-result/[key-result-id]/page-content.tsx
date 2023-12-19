"use client";

import { ScrollArea, Tooltip } from "@radix-ui/themes";
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

  console.log(taskCountsByDate);

  Chart.register(...registerables);

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    lineTension: 0.4,
  };

  const width = window.innerWidth;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {keyResult.name}
      </div>
      <div>必要なタスク：{taskCount}</div>
      <div>完了したタスク：{finishTaskCount}</div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 bg-white">
          <span>完了したタスク数の推移</span>
          <Line
            width={width / 1.5}
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
        </div>
        <div className="max-w-[30%] h-[332px] bg-white">
          <div className="flex flex-col gap-[8px] bg-white">
            <span>タスクの進捗率</span>
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
        </div>
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
