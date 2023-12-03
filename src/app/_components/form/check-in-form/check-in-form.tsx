import { useCheckinForm } from "./use-form";
import type { KeyResult } from "@prisma/client";
import { CheckinModalFooter } from "../../modal/check-in-modal/check-in-modal-footer";
import { Text } from "@radix-ui/themes";

type KeyResultCreateFormProps = {
  keyResults: ReadonlyArray<KeyResult>;
};

export const CheckinForm = ({ keyResults }: KeyResultCreateFormProps) => {
  const { onSubmit, handleSubmit, register } = useCheckinForm({
    keyResults,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {keyResults.map((kr, index) => (
          <div key={index}>
            <div className="flex flex-col gap-1">
              <Text size="3" className="font-bold">
                {kr.name}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <div className="mt-2 flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <label className="text-sm" htmlFor="currentValue">
                    実績値
                  </label>
                  <input
                    type="number"
                    className="h-[30px] w-[40px] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                    id="currentValue"
                    {...register(`keyResults.${index}.currentValue`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <label className="text-sm" htmlFor="unit">
                    目標
                  </label>
                  <Text size="3" className="font-bold">
                    {kr.targetValue} {kr.unit}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CheckinModalFooter />
    </form>
  );
};
