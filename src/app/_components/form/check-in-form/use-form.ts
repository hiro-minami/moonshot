import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import type { KeyResult } from "@prisma/client";

type UseCheckinFormProps = {
  keyResults: ReadonlyArray<KeyResult>;
};

export const useCheckinForm = ({ keyResults }: UseCheckinFormProps) => {
  const router = useRouter();

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
      router.refresh();
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
