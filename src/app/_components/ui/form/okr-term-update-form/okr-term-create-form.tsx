import type { OkrTerm } from "@prisma/client";
import { OkrTermUpdateModalFooter } from "../../modal/okr-term-update-modal";
import { useOkrTermUpdateForm } from "./use-form";

type OkrTermUpdateFormProps = {
  okrTerm: OkrTerm;
};

export const OkrTermUpdateForm = ({ okrTerm }: OkrTermUpdateFormProps) => {
  const { onSubmit, handleSubmit, register } = useOkrTermUpdateForm(okrTerm);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            目標名
          </label>
          <input
            className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
            placeholder="例：最強のエンジニアになる"
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
      <OkrTermUpdateModalFooter />
    </form>
  );
};
