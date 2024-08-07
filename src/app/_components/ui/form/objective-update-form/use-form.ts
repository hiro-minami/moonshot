import { zodResolver } from "@hookform/resolvers/zod";
import type { Objective } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

export const useObjectiveUpdateForm = (objective: Objective) => {
  const router = useRouter();
  const openToast = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: objective.name,
      description: objective.description,
    },
  });

  const updateObjective = api.objective.updateObjective.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `Objectiveを更新しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `Objectiveの更新に失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    updateObjective.mutate({
      id: objective.id,
      name: data.name,
      description: data.description,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
