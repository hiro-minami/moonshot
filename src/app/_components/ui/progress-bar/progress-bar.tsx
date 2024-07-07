import * as Progress from "@radix-ui/react-progress";
import { Tooltip } from "@radix-ui/themes";

type ProgressBarProps = {
  progressRate: number;
};
export const ProgressBar = ({ progressRate }: ProgressBarProps) => {
  return (
    <Tooltip content={`進捗：${progressRate}%`} delayDuration={100}>
      <Progress.Root
        className="relative bg-gray-200 overflow-hidden rounded-full w-[100px] h-2.5"
        style={{
          transform: "translateZ(0)",
        }}
        value={progressRate}
      >
        <Progress.Indicator
          className="bg-[#9f53ec] w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - progressRate}%)` }}
        />
      </Progress.Root>
    </Tooltip>
  );
};
