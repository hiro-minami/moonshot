import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useKeyResultForm = (createdById: string, objectiveId: number) => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    targetValue: z.number(),
    unit: z.string(),
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

  const createKeyResult = api.keyResult.createKeyResult.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (!currentOkrTerm.data) throw new Error("No current OKR term");
    console.log(data);

    createKeyResult.mutate({
      name: data.name,
      createdById,
      okrTermId: currentOkrTerm.data.id,
      objectiveId,
      targetValue: Number(data.targetValue),
      unit: data.unit,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
