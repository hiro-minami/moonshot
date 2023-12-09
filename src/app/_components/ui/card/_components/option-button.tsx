import type { KeyResult } from "@prisma/client";
import { CrumpledPaperIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { KeyResultUpdateForm } from "../../form/key-result-update-form";
import { KeyResultUpdateModal } from "../../modal/key-result-update-modal";

type OptionButtonProps = {
  onClick: () => void;
  keyResult?: KeyResult;
};

// TODO: 編集モーダルを開いた時にメニューを閉じるようにする
export const OptionButton = ({ onClick, keyResult }: OptionButtonProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <DotsHorizontalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {keyResult && (
          <DropdownMenu.Item
            className="hover:bg-[#9f53ec]"
            onClick={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <KeyResultUpdateModal>
              <KeyResultUpdateForm keyResult={keyResult} />
            </KeyResultUpdateModal>
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Item className="hover:bg-[#9f53ec]" onClick={onClick}>
          <div className="flex flex-row items-center gap-2">
            <CrumpledPaperIcon />
            <span>削除</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
