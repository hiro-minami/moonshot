"use client";
import type { OkrTerm } from "@prisma/client";
import { Card, Inset, Popover, Text } from "@radix-ui/themes";
import Picker from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";
import { OkrTermUpdateForm } from "../../form/okr-term-update-form";
import { OkrTermDeleteAlertModal } from "../../modal/alert-modal/okr-term-delete-alert-modal";
import { OkrTermUpdateModal } from "../../modal/okr-term-update-modal";

type OkrTermCardProps = {
  okrTerm: OkrTerm;
};

export const OkrTermCard = ({ okrTerm }: OkrTermCardProps) => {
  const router = useRouter();
  const openToast = useToast();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { mutate: deleteOkrTerm } = api.okrTerm.deleteOkrTerm.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: "OKR期間を削除しました",
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `OKR期間の削除に失敗しました ${error.message}`,
      });
    },
  });

  const handleDeleteOkrTerm = useCallback(() => {
    deleteOkrTerm({ id: okrTerm.id });
  }, [okrTerm, deleteOkrTerm]);

  const { mutate: updateEmoji } = api.okrTerm.updateEmoji.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: "絵文字を更新しました",
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `絵文字の更新に失敗しました ${error.message}`,
      });
    },
  });

  const updateEmojiHandler = useCallback(
    (emoji: string) => {
      updateEmoji({ id: okrTerm.id, emoji });
    },
    [okrTerm, updateEmoji],
  );

  return (
    <Card size="2" className="w-[280px]">
      <Inset clip="padding-box" side="top" className="bg-[#9f53ec]/50">
        <div className="flex flex-row items-center justify-center p-6">
          <Popover.Root>
            <Popover.Trigger>
              <Text as="div" size="8" weight="bold" className="cursor-pointer">
                {okrTerm.emoji ?? "🎯"}
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
        </div>
      </Inset>
      <div className="flex flex-col gap-2 pt-2">
        <Link href={`/okr/${btoa(`OkrTermId:${okrTerm.id}`)}`}>
          <Text
            as="div"
            size="2"
            weight="bold"
            className="hover:text-[#9f53ec]"
          >
            {okrTerm.name}
          </Text>
        </Link>
        <div className="flex flex-row justify-between items-center">
          <Text as="div" size="1" weight="regular" className="text-[#9CA3AF]">
            {formatDate(okrTerm.startDate)} 〜 {formatDate(okrTerm.endDate)}
          </Text>
          <div className="flex flex-row gap-2 justify-end">
            <OkrTermUpdateModal>
              <OkrTermUpdateForm okrTerm={okrTerm} />
            </OkrTermUpdateModal>
            <OkrTermDeleteAlertModal onClick={handleDeleteOkrTerm} />
          </div>
        </div>
      </div>
    </Card>
  );
};
