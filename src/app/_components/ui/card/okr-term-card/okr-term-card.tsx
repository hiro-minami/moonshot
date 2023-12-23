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
  emoji: string;
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

  const { mutate: deleteOkrTerm } = api.okrTerm.deleteOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDeleteOkrTerm = useCallback(() => {
    deleteOkrTerm({ id });
  }, [id, deleteOkrTerm]);

  const { mutate: updateEmoji } = api.okrTerm.updateEmoji.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateEmojiHandler = useCallback(
    (emoji: string) => {
      updateEmoji({ id, emoji });
    },
    [id, updateEmoji],
  );

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[16px] pl-2">
          <Popover.Root>
            <Popover.Trigger>
              <Text as="div" size="8" weight="bold" className="cursor-pointer">
                {emoji}
              </Text>
            </Popover.Trigger>
            <Popover.Content>
              <Picker
                width={300}
                height={400}
                onEmojiClick={(emoji) => {
                  updateEmojiHandler(emoji.emoji);
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
        <OptionButton onClick={handleDeleteOkrTerm} />
      </div>
    </Card>
  );
};
