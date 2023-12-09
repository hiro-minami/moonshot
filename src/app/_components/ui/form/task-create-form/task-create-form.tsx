import { useTaskCreateForm } from "./use-form";

type TaskCreateFormProps = {
  keyResultId: number;
};

export const TaskCreateForm = ({ keyResultId }: TaskCreateFormProps) => {
  const { onSubmit, errors, handleSubmit, register } =
    useTaskCreateForm(keyResultId);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <input
          className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
          placeholder="Taskを入力してください"
          id={"name"}
          {...register("name")}
        />
      </div>
    </form>
  );
};
