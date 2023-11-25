"use client";

import { Button, Dialog } from "@radix-ui/themes";

export const OkrCreateModalFooter = () => {
  return (
    <div className="mt-4 flex flex-row justify-end gap-4">
      <Dialog.Close>
        <Button className="text-[#d3d3d3] hover:text-black">キャンセル</Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button type="submit" className="bg-[#9f53ec]">
          作成
        </Button>
      </Dialog.Close>
    </div>
  );
};
