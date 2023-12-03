"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";

export const CheckInModalTitle = () => {
  return (
    <div className="flex flex-row justify-between">
      <span>チェックイン</span>
      <Dialog.Close>
        <Button className="text-[#d3d3d3] hover:text-black">
          <Cross2Icon />
        </Button>
      </Dialog.Close>
    </div>
  );
};
