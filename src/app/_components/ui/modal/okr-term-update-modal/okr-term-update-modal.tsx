"use client";

import { NotePencil } from "@phosphor-icons/react";
import { Dialog, Tooltip } from "@radix-ui/themes";
import { OkrTermUpdateModalTitle } from "./okr-term-update-modal-title";

type OkrTermCreateModalProps = {
  children: React.ReactNode;
};

export const OkrTermUpdateModal = ({ children }: OkrTermCreateModalProps) => {
  return (
    <Dialog.Root>
      <Tooltip content="編集する" delayDuration={100}>
        <Dialog.Trigger>
          <NotePencil
            size={20}
            className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
          />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title>
          <OkrTermUpdateModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
