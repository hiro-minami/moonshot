"use client";
import { DiscordLogo } from "@phosphor-icons/react";
import { Button, Text } from "@radix-ui/themes";
import type { Session } from "next-auth";
import Link from "next/link";

type LoginProps = {
  session: Session;
};

// TODO: ログインの時はTOPバーを非表示にする
export const Login = ({ session }: LoginProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-[200px]">
      <div className="flex flex-col items-center gap-4 border w-[300px] bg-white p-[32px]">
        <Text className="text-2xl font-bold">ログイン</Text>
        <div className="flex flex-col gap-4 pt-6">
          <Button
            variant="ghost"
            className="flex flex-row items-center gap-2 px-4 py-2"
          >
            <DiscordLogo size={24} />
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
