"use client";

import {
  StarAndCrescent,
  TrendUp,
  UserCircleGear,
} from "@phosphor-icons/react";
import { Button, DropdownMenu, Tooltip } from "@radix-ui/themes";
import { Exo_2 } from "next/font/google";

import Link from "next/link";

const exo_2 = Exo_2({
  weight: "500",
  subsets: ["latin"],
});

export const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-12 py-[12px] bg-[#9f53ec]">
      <div className="flex flex-row gap-2 items-center">
        <StarAndCrescent size={32} color="#fffafa" />
        <span className="text-2xl text-[#fffafa]" style={exo_2.style}>
          LunaTrek
        </span>
      </div>
      <div className="flex flex-row gap-4 items-center">
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
              <Link href="/okr-terms">
                <span>目標の一覧を見る</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-[#9f53ec]">
              <Link href="/okr">
                <span>現在の目標と計測する指標を見る</span>
              </Link>
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
                <Link
                  href="/api/auth/signout"
                  className="rounded-full no-underline transition"
                >
                  ログアウト
                </Link>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};
