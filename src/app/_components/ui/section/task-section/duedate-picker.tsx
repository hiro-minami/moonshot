import { CalendarPlus } from "@phosphor-icons/react";
import { Popover, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { api } from "~/trpc/react";

type DueDatePickerProps = {
  taskId: number;
};

export const DueDatePicker = ({ taskId }: DueDatePickerProps) => {
  const router = useRouter();

  const { mutate } = api.task.setDueDate.useMutation({
    onSuccess: () => {
      router.refresh();
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
        />
      </Popover.Content>
    </Popover.Root>
  );
};
