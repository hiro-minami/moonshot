import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { KeyResultUpdateModalFooter } from "../../modal/key-result-update-modal";
import { useKeyResultForm } from "./use-form";

type KeyResultCreateFormProps = {
  createdById: string;
  objectiveId: number;
};

// TODO: バリデーションの追加
export const KeyResultCreateForm = ({
  createdById,
  objectiveId,
}: KeyResultCreateFormProps) => {
  const { onSubmit, errors, handleSubmit, register, fields, append, remove } =
    useKeyResultForm(createdById, objectiveId);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex flex-col gap-1">
              <label className="text-sm" htmlFor={`name${index}`}>
                Key Result名
              </label>
              <input
                className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                placeholder="Key Result名を入力してください"
                id={`name${index}`}
                {...register(`keyResults.${index}.name`)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">ゴール設定</span>
              <div className="mt-2 flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <label className="text-sm" htmlFor={`targetValue${index}`}>
                    目標値
                  </label>
                  <input
                    type="number"
                    className="h-[30px] w-[40px] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                    id={`targetValue${index}`}
                    {...register(`keyResults.${index}.targetValue`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <label className="text-sm" htmlFor={`unit${index}`}>
                    単位
                  </label>
                  <input
                    className="h-[30px] w-[40px] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                    id={`unit${index}`}
                    {...register(`keyResults.${index}.unit`)}
                  />
                </div>
                <IconButton variant="ghost" onClick={() => remove(index)}>
                  <MinusCircledIcon width="18" height="18" />
                </IconButton>
                <IconButton
                  variant="ghost"
                  onClick={() => append({ name: "", targetValue: 0, unit: "" })}
                >
                  <PlusCircledIcon width="18" height="18" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <KeyResultUpdateModalFooter />
    </form>
  );
};
