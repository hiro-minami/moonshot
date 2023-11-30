"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { KeyResultCreateModalTitle } from "./key-result-create-modal-title";

type KeyResultCreateModalProps = {
  children: React.ReactNode;
};

export const KeyResultCreateModal = ({
  children,
}: KeyResultCreateModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
          <span className="font-bold">Key Resultを作成する</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <KeyResultCreateModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
