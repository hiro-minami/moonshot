"use client";
import { Box, Card, Popover, Text } from "@radix-ui/themes";
import Picker from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import { OptionButton } from "../_components";

type OkrTermCardProps = {
  id: number;
  name: string;
  emoji?: string;
  startDate: Date;
  endDate: Date;
};

export const OkrTermCard = ({
  id,
  name,
  emoji,
  startDate,
  endDate,
}: OkrTermCardProps) => {
  const router = useRouter();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { mutate } = api.okrTerm.deleteOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteOkrTerm = useCallback(() => {
    mutate({ id });
  }, [id, mutate]);

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[20px] pl-2">
          <Popover.Root>
            <Popover.Trigger>
              <Text as="div" size="5" weight="bold" className="cursor-pointer">
                {emoji ? emoji : "🚀"}
              </Text>
            </Popover.Trigger>
            <Popover.Content>
              <Picker
                width={300}
                height={400}
                onEmojiClick={(emoji) => {
                  console.log(emoji);
                }}
              />
            </Popover.Content>
          </Popover.Root>
          <Box>
            <Link href={`/okr/${btoa(`OkrTermId:${id}`)}`}>
              <Text as="div" size="2" weight="bold">
                {name}
              </Text>
            </Link>
            <Text as="div" size="2" weight="bold">
              {formatDate(startDate)} ~ {formatDate(endDate)}
            </Text>
          </Box>
        </div>
        <OptionButton onClick={deleteOkrTerm} />
      </div>
    </Card>
  );
};
