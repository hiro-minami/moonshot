"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { CheckInModalTitle } from "./check-in-modal-title";
import type { KeyResult } from "@prisma/client";
import { CheckinForm } from "../../form/check-in-form";

type CheckinModalProps = {
  children?: React.ReactNode;
  keyResults: ReadonlyArray<KeyResult>;
};

export const CheckinModal = ({ children, keyResults }: CheckinModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {children ? (
          children
        ) : (
          <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
            <span className="font-bold">チェックイン</span>
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <CheckInModalTitle />
        </Dialog.Title>
        <CheckinForm keyResults={keyResults} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
