import { Card } from "@radix-ui/themes";
import { Doughnut } from "react-chartjs-2";

type CompletedTaskRateCardProps = {
  taskCount: number;
  finishTaskCount: number;
};

export const CompletedTaskRateCard = ({
  taskCount,
  finishTaskCount,
}: CompletedTaskRateCardProps) => {
  return (
    <Card className="h-[440px] col-span-3">
      <div className="flex flex-col gap-[4px] bg-white">
        <span>タスクの消化率</span>
        <div className="flex flex-col items-center">
          <Doughnut
            className="!w-[380px] !h-[380px]"
            data={{
              labels: ["完了したタスク", "未完了のタスク"],
              datasets: [
                {
                  data: [finishTaskCount, taskCount - finishTaskCount],
                  backgroundColor: ["#9f53ec", "#d9d9d9"],
                },
              ],
            }}
          />
        </div>
      </div>
    </Card>
  );
};
