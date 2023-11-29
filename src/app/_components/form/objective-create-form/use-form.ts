import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useObjectiveForm = (createdById: string) => {
  const router = useRouter();

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

  const currentOkrTerm = api.okrTerm.getCurrentOkrTerm.useQuery();
  console.log(currentOkrTerm.data);

  const createObjective = api.objective.createObjective.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (!currentOkrTerm.data) throw new Error("No current OKR term");

    createObjective.mutate({
      name: data.name,
      createdById,
      description: data.description,
      okrTermId: currentOkrTerm.data.id,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
