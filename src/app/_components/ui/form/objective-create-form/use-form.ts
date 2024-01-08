import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

export const useObjectiveForm = (okrTermId: number, createdById: string) => {
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
  });

  const createObjective = api.objective.createObjective.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `Objectiveを作成しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `Objectiveの作成に失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createObjective.mutate({
      name: data.name,
      createdById,
      description: data.description,
      okrTermId,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
