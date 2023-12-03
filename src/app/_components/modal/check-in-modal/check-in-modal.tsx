"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { CheckInModalTitle } from "./check-in-modal-title";

type CheckinModalProps = {
  children: React.ReactNode;
};

export const CheckinModal = ({ children }: CheckinModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
          <span className="font-bold">チェックイン</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <CheckInModalTitle />
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
