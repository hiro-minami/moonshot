import { zodResolver } from "@hookform/resolvers/zod";
import type { KeyResult } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

type UseKeyResultUpdateFormProps = {
  keyResult: KeyResult;
};

export const useKeyResultUpdateForm = ({
  keyResult,
}: UseKeyResultUpdateFormProps) => {
  const router = useRouter();
  const openToast = useToast();

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
    defaultValues: {
      name: keyResult.name,
      targetValue: keyResult.targetValue,
      unit: keyResult.unit,
    },
  });

  const currentOkrTerm = api.okrTerm.getCurrentOkrTerm.useQuery();

  const updateKeyResult = api.keyResult.updateKeyResult.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `KeyResultを更新しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `KeyResultの更新に失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (!currentOkrTerm.data) throw new Error("No current OKR term");
    console.log(data);

    updateKeyResult.mutate({
      id: keyResult.id,
      name: data.name,
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
