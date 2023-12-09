"use client";

import { Button, Dialog } from "@radix-ui/themes";

export const CheckinModalFooter = () => {
  return (
    <div className="mt-4 flex flex-row justify-end gap-4">
      <Dialog.Close>
        <Button className="text-[#d3d3d3] hover:text-black">キャンセル</Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button type="submit" className="bg-[#9f53ec] hover:bg-[#9f53ec]/80">
          チェックイン
        </Button>
      </Dialog.Close>
    </div>
  );
};