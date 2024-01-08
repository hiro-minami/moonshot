import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

export const useTaskCreateForm = (keyResultId: number) => {
  const router = useRouter();
  const openToast = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const createTask = api.task.createTask.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `タスクを作成しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `タスクの作成に失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    createTask.mutate({
      name: data.name,
      keyResultId,
    });
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
