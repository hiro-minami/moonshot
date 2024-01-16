import { Trash } from "@phosphor-icons/react";
import { AlertDialog, Button, Tooltip } from "@radix-ui/themes";

type KeyResultDeleteAlertModalProps = {
  onClick: () => void;
};
export const KeyResultDeleteAlertModal = ({
  onClick,
}: KeyResultDeleteAlertModalProps) => {
  return (
    <AlertDialog.Root>
      <Tooltip content="削除する" delayDuration={100}>
        <AlertDialog.Trigger>
          <Trash
            size={20}
            className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
          />
        </AlertDialog.Trigger>
      </Tooltip>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>KeyResultを削除する</AlertDialog.Title>
        <AlertDialog.Description size="3">
          <p>本当に削除しますか？削除した場合、復元することはできません。</p>
          <p>また、削除した期間に紐づくタスクも削除されます。</p>
        </AlertDialog.Description>

        <div className="flex flex-row gap-4 items-center justify-end pt-4">
          <AlertDialog.Cancel>
            <p className="cursor-pointer text-[#d3d3d3] hover:text-black text-[14px]">
              キャンセル
            </p>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              className="bg-[#9f53ec] hover:bg-[#9f53ec]/80"
              onClick={onClick}
            >
              削除する
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
