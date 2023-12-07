import type { KeyResult } from "@prisma/client";
import { KeyResultUpdateModalFooter } from "../../modal/key-result-update-modal";
import { useKeyResultUpdateForm } from "./use-form";

type KeyResultUpdateFormProps = {
  keyResult: KeyResult;
};

export const KeyResultUpdateForm = ({
  keyResult,
}: KeyResultUpdateFormProps) => {
  const { onSubmit, errors, handleSubmit, register } = useKeyResultUpdateForm({
    keyResult,
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            Key Result名
          </label>
          <input
            className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
            placeholder="Key Result名を入力してください"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm">ゴール設定</span>
          <div className="mt-2 flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <label className="text-sm" htmlFor="targetValue">
                目標値
              </label>
              <input
                type="number"
                className="h-[30px] w-[40px] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                id="targetValue"
                {...register("targetValue", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label className="text-sm" htmlFor="unit">
                単位
              </label>
              <input
                className="h-[30px] w-[40px] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                id="unit"
                {...register("unit")}
              />
            </div>
          </div>
        </div>
      </div>
      <KeyResultUpdateModalFooter />
    </form>
  );
};
