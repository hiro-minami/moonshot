import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

export const useKeyResultForm = (createdById: string, objectiveId: number) => {
  const router = useRouter();

  const formSchema = z.object({
    keyResults: z.array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        targetValue: z.number(),
        unit: z.string(),
      }),
    ),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyResults: [{ name: "", targetValue: 0, unit: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyResults",
  });

  const currentOkrTerm = api.okrTerm.getCurrentOkrTerm.useQuery();

  const createKeyResults = api.keyResult.createKeyResults.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (!currentOkrTerm.data) throw new Error("No current OKR term");
    console.log(data);

    const keyResultsData = data.keyResults.map((kr) => ({
      name: kr.name,
      createdById,
      okrTermId: currentOkrTerm.data!.id,
      objectiveId,
      targetValue: Number(kr.targetValue),
      unit: kr.unit,
    }));

    createKeyResults.mutate({ keyResults: keyResultsData });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    fields,
    append,
    remove,
  };
};
