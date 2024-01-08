import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

export const useKeyResultForm = (
  okrTermId: number,
  createdById: string,
  objectiveId: number,
) => {
  const router = useRouter();
  const openToast = useToast();

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

  const createKeyResults = api.keyResult.createKeyResults.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `KeyResultを作成しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `KeyResultの作成に失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const keyResultsData = data.keyResults.map((kr) => ({
      name: kr.name,
      createdById,
      okrTermId,
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
