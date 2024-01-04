"use client";

import { Card } from "@radix-ui/themes";
import { Line } from "react-chartjs-2";

type CompletedTaskCountCardProps = {
  dates: string[];
  counts: number[];
};

export const CompletedTaskCountCard = ({
  dates,
  counts,
}: CompletedTaskCountCardProps) => {
  const options = {
    maintainAspectRatio: false,
    responsive: false,
    lineTension: 0.4,
  };

  const width = window.innerWidth;

  return (
    <Card className="flex flex-col gap-2 bg-white col-span-7">
      <span>完了したタスク数の推移</span>
      <Line
        width={width / 1.6}
        height={392}
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
  );
};
