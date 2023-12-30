import type { Objective } from "@prisma/client";
import { TextArea } from "@radix-ui/themes";
import { ObjectiveUpdateModalFooter } from "../../modal/objective-update-modal";
import { useObjectiveUpdateForm } from "./use-form";

type ObjectiveUpdateFormProps = {
  objective: Objective;
};

// TODO: FormProiderを使ってuserIdのprop drillingを解消する
export const ObjectiveUpdateForm = ({
  objective,
}: ObjectiveUpdateFormProps) => {
  const { onSubmit, errors, handleSubmit, register } =
    useObjectiveUpdateForm(objective);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            Objective名
          </label>
          <input
            className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
            placeholder="Objective名を入力してください"
            id="name"
            {...register("name")}
          />
        </div>
        <fieldset className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="startDate">
            Objectiveの説明
          </label>
          <div className="flex flex-row gap-4">
            <TextArea
              id="description"
              placeholder="Objectiveの説明を入力してください"
              className="w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
              {...register("description")}
            />
          </div>
        </fieldset>
      </div>
      <ObjectiveUpdateModalFooter />
    </form>
  );
};
