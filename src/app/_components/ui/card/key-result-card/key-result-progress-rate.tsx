import type { KeyResult } from "@prisma/client";
import * as Progress from "@radix-ui/react-progress";
import { Button, Tooltip } from "@radix-ui/themes";
import { CheckinModal } from "../../modal/check-in-modal";

type KeyResultProgressRateProps = {
  keyResult: KeyResult;
  progressRate: number;
  readonly: boolean;
};

export const KeyResultProgressRate = ({
  keyResult,
  progressRate,
  readonly,
}: KeyResultProgressRateProps) => {
  if (readonly) {
    return (
      <Tooltip content={`${progressRate}%`} delayDuration={100}>
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
  }
  return (
    <CheckinModal keyResults={[keyResult]}>
      <Button className="p-0 h-0">
        <Tooltip content={`${progressRate}%`} delayDuration={100}>
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
      </Button>
    </CheckinModal>
  );
};
