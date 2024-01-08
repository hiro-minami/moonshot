import { CalendarPlus } from "@phosphor-icons/react";
import { Popover, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";

type DueDatePickerProps = {
  taskId: number;
};

export const DueDatePicker = ({ taskId }: DueDatePickerProps) => {
  const router = useRouter();
  const openToast = useToast();

  const { mutate } = api.task.setDueDate.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: `タスクの期限を設定しました`,
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `タスクの期限の設定に失敗しました。${error.message}`,
      });
    },
  });

  const closePopper = (date: Date | undefined) => {
    if (!date) return;
    mutate({ id: taskId, dueDate: date });
  };

  return (
    <Popover.Root>
      <Tooltip content="期限日を決める" delayDuration={100}>
        <Popover.Trigger>
          <CalendarPlus
            size={20}
            className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
          />
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content style={{ width: 340, height: 372 }}>
        <DayPicker
          mode="single"
          onSelect={closePopper}
          className="z-100 bg-white"
          classNames={{
            day_today: "rounded-full bg-gray-200 text-gray-900",
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
