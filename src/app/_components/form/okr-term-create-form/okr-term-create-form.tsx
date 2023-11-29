import { OkrTermCreateModalFooter } from "../../modal/okr-term-create-modal";
import { useOkrTermForm } from "./use-form";

type OkrTermCreateFormProps = {
  createdById: string;
};

// TODO: FormProiderを使ってuserIdのprop drillingを解消する
export const OkrTermCreateForm = ({ createdById }: OkrTermCreateFormProps) => {
  const { onSubmit, handleSubmit, register } = useOkrTermForm(createdById);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            期間名
          </label>
          <input
            className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
            placeholder="OKR期間1"
            id="name"
            {...register("name")}
          />
        </div>
        <fieldset className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="startDate">
            期間
          </label>
          <div className="flex flex-row gap-4">
            <input
              type="date"
              className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
              id="startDate"
              {...register("startDate")}
            />
            <span> ~ </span>
            <input
              type="date"
              className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
              {...register("endDate")}
            />
          </div>
        </fieldset>
      </div>
      <OkrTermCreateModalFooter />
    </form>
  );
};
