import { KeyResultCreateModalFooter } from "../../modal/key-result-crate-modal";
import { useKeyResultForm } from "./use-form";

type KeyResultCreateFormProps = {
  createdById: string;
  objectiveId: number;
};

// TODO: FormProiderを使ってuserIdのprop drillingを解消する
export const KeyResultCreateForm = ({
  createdById,
  objectiveId,
}: KeyResultCreateFormProps) => {
  const { onSubmit, errors, handleSubmit, register } = useKeyResultForm(
    createdById,
    objectiveId,
  );

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
      <KeyResultCreateModalFooter />
    </form>
  );
};
