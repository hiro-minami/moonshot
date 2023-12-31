"use client";
import { Trash } from "@phosphor-icons/react";
import type { OkrTerm } from "@prisma/client";
import { Box, Card, Popover, Text } from "@radix-ui/themes";
import Picker from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import { OkrTermUpdateForm } from "../../form/okr-term-update-form";
import { OkrTermUpdateModal } from "../../modal/okr-term-update-modal";

type OkrTermCardProps = {
  okrTerm: OkrTerm;
};

export const OkrTermCard = ({ okrTerm }: OkrTermCardProps) => {
  const router = useRouter();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { mutate: deleteOkrTerm } = api.okrTerm.deleteOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDeleteOkrTerm = useCallback(() => {
    deleteOkrTerm({ id: okrTerm.id });
  }, [okrTerm, deleteOkrTerm]);

  const { mutate: updateEmoji } = api.okrTerm.updateEmoji.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateEmojiHandler = useCallback(
    (emoji: string) => {
      updateEmoji({ id: okrTerm.id, emoji });
    },
    [okrTerm, updateEmoji],
  );

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[16px] pl-2">
          <Popover.Root>
            <Popover.Trigger>
              <Text as="div" size="8" weight="bold" className="cursor-pointer">
                {okrTerm.emoji}
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
            <Link href={`/okr/${btoa(`OkrTermId:${okrTerm.id}`)}`}>
              <Text as="div" size="2" weight="bold">
                {okrTerm.name}
              </Text>
            </Link>
            <Text as="div" size="2" weight="bold">
              {formatDate(okrTerm.startDate)} ~ {formatDate(okrTerm.endDate)}
            </Text>
          </Box>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <OkrTermUpdateModal>
            <OkrTermUpdateForm okrTerm={okrTerm} />
          </OkrTermUpdateModal>
          <Trash
            size={20}
            className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
            onClick={handleDeleteOkrTerm}
          />
        </div>
      </div>
    </Card>
  );
};
