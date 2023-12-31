import { zodResolver } from "@hookform/resolvers/zod";
import type { OkrTerm } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

export const useOkrTermUpdateForm = (okrTerm: OkrTerm) => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    startDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
    endDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: okrTerm.name,
      startDate: okrTerm.startDate.toISOString().split("T")[0],
      endDate: okrTerm.endDate.toISOString().split("T")[0],
    },
  });

  const updateOkrTerm = api.okrTerm.updateOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    updateOkrTerm.mutate({
      id: okrTerm.id,
      name: data.name,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
