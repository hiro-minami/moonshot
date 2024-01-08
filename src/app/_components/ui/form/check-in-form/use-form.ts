import { zodResolver } from "@hookform/resolvers/zod";
import type { KeyResult } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

type UseCheckinFormProps = {
  keyResults: ReadonlyArray<KeyResult>;
};

export const useCheckinForm = ({ keyResults }: UseCheckinFormProps) => {
  const router = useRouter();
  const openToast = useToast();

  const formSchema = z.object({
    keyResults: z.array(
      z.object({
        id: z.number(),
        currentValue: z.number(),
      }),
    ),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const keyResultsFormData = keyResults.map((kr) => ({
    id: kr.id,
    currentValue: kr.currentValue,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { keyResults: keyResultsFormData },
  });

  const { fields } = useFieldArray({
    control,
    name: "keyResults",
  });

  const checkin = api.keyResult.checkin.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `チェックインに成功しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `チェックインに失敗しました。${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) =>
    checkin.mutate(data.keyResults);

  return {
    fields,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
