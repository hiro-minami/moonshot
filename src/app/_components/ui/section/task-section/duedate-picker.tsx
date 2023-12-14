import { CalendarIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

export const DueDatePicker = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip content="期限日を決める">
        <CalendarIcon
          className="cursor-pointer text-[#E5E7EB] hover:text-[#9f53ec]"
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      {open && (
        <DayPicker
          mode="single"
          onSelect={() => setOpen(false)}
          className="absolute z-100 bg-white"
        />
      )}
    </>
  );
};
