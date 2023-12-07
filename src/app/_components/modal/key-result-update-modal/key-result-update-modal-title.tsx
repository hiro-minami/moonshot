"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";

export const KeyResultUpdateModalTitle = () => {
  return (
    <div className="flex flex-row justify-between">
      <span>Key Resultの編集</span>
      <Dialog.Close>
        <Button className="text-[#d3d3d3] hover:text-black">
          <Cross2Icon />
        </Button>
      </Dialog.Close>
    </div>
  );
};
