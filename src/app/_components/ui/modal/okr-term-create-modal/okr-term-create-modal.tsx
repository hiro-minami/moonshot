"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { OkrTermCreateModalTitle } from "./okr-term-create-modal-title";

type OkrTermCreateModalProps = {
  children: React.ReactNode;
};

export const OkrTermCreateModal = ({ children }: OkrTermCreateModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
          <span className="font-bold">OKR期間を作成する</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <OkrTermCreateModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
