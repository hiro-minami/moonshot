"use client";

import {
  FlagCheckered,
  ListPlus,
  TrendUp,
  UserCircleGear,
} from "@phosphor-icons/react";
import { Button, DropdownMenu, Tooltip } from "@radix-ui/themes";

export const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-12 py-[12px] bg-[#9f53ec]">
      <div className="flex items-center gap-2">
        <FlagCheckered color="#fffafa" size={32} weight="fill" />
        <span className="text-2xl font-bold text-[#fffafa]">Itadaki</span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <Tooltip content="作る">
                <ListPlus
                  color="#fffafa"
                  size={24}
                  weight="bold"
                  className="cursor-pointer"
                />
              </Tooltip>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>目標を作る</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>計測する指標を作る</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>目標のためにやることを作る</span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <Tooltip content="確認する">
                <TrendUp
                  color="#fffafa"
                  size={24}
                  weight="bold"
                  className="cursor-pointer"
                />
              </Tooltip>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>目標の一覧を見る</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>目標と計測する指標を見る</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>目標のためにやることの一覧を見る</span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <Tooltip content="設定">
                <UserCircleGear
                  color="#fffafa"
                  size={24}
                  weight="bold"
                  className="cursor-pointer"
                />
              </Tooltip>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <div className="flex flex-row items-center gap-2">
                <span>ログアウト</span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};
