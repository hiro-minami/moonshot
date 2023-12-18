import { CalendarIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "react-popper";
import { api } from "~/trpc/react";

type DueDatePickerProps = {
  taskId: number;
};

export const DueDatePicker = ({ taskId }: DueDatePickerProps) => {
  const router = useRouter();
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const { mutate } = api.task.setDueDate.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = (date: Date | undefined) => {
    console.log(date);
    if (!date) return;
    mutate({ id: taskId, dueDate: date });
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };
  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };
  return (
    <>
      <Tooltip content="期限日を決める">
        <div ref={popperRef}>
          <CalendarIcon
            className="cursor-pointer text-[#E5E7EB] hover:text-[#9f53ec]"
            onClick={handleButtonClick}
          />
        </div>
      </Tooltip>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
          aria-label="DayPicker calendar"
        >
          <DayPicker
            mode="single"
            onSelect={closePopper}
            className="z-100 bg-white"
          />
        </div>
      )}
    </>
  );
};
