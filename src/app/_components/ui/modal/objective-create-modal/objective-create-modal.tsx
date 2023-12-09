"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { ObjectiveCreateModalTitle } from "./objective-create-modal-title";

type ObjectiveCreateModalProps = {
  children: React.ReactNode;
};

export const ObjectiveCreateModal = ({
  children,
}: ObjectiveCreateModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
          <span className="font-bold">Objectiveを作成する</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <ObjectiveCreateModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
