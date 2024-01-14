"use client";

import type { KeyResult } from "@prisma/client";
import { Button, Dialog, Tooltip } from "@radix-ui/themes";
import { CheckinForm } from "../../form/check-in-form";
import { CheckInModalTitle } from "./check-in-modal-title";

type CheckinModalProps = {
  children?: React.ReactNode;
  keyResults: ReadonlyArray<KeyResult>;
};

export const CheckinModal = ({ children, keyResults }: CheckinModalProps) => {
  return (
    <Dialog.Root>
      <Tooltip content="進捗を更新する" delayDuration={100}>
        <Dialog.Trigger>
          {children ? (
            children
          ) : (
            <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
              <span className="font-bold">進捗を一括で更新する</span>
            </Button>
          )}
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title>
          <CheckInModalTitle />
        </Dialog.Title>
        <CheckinForm keyResults={keyResults} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
