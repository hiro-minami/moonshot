import type { KeyResult } from "@prisma/client";
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
        <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
          <div
            className="h-full rounded-full bg-[#9f53ec]"
            style={{ width: `${progressRate}%` }}
          />
        </div>
      </Tooltip>
    );
  }
  return (
    <CheckinModal keyResults={[keyResult]}>
      <Button className="p-0 h-0">
        <Tooltip content={`${progressRate}%`} delayDuration={100}>
          <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
            <div
              className="h-full rounded-full bg-[#9f53ec]"
              style={{ width: `${progressRate}%` }}
            />
          </div>
        </Tooltip>
      </Button>
    </CheckinModal>
  );
};
