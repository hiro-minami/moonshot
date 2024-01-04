import { TextArea } from "@radix-ui/themes";
import { ObjectiveCreateModalFooter } from "../../modal/objective-create-modal";
import { useObjectiveForm } from "./use-form";

type OkrTermCreateFormProps = {
  okrTermId: number;
  createdById: string;
};

export const ObjectiveCreateForm = ({
  okrTermId,
  createdById,
}: OkrTermCreateFormProps) => {
  const { onSubmit, handleSubmit, register } = useObjectiveForm(
    okrTermId,
    createdById,
  );

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
      <ObjectiveCreateModalFooter />
    </form>
  );
};
