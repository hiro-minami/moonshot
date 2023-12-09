"use client";

import { Pencil1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import { KeyResultUpdateModalTitle } from "./key-result-update-modal-title";

type KeyResultCreateModalProps = {
  children: React.ReactNode;
};

export const KeyResultUpdateModal = ({
  children,
}: KeyResultCreateModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="flex flex-row items-center gap-2">
          <Pencil1Icon />
          <span>編集</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <KeyResultUpdateModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
