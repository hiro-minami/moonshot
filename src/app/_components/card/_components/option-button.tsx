import { CrumpledPaperIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";

type OptionButtonProps = {
  onClick: () => void;
};

export const OptionButton = ({ onClick }: OptionButtonProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <DotsHorizontalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
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
