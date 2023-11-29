import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useOkrTermForm = (createdById: string) => {
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
  });

  const createOkrTerm = api.okrTerm.createOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createOkrTerm.mutate({
      name: data.name,
      createdById,
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
