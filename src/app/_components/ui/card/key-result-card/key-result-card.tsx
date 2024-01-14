import type { KeyResult } from "@prisma/client";
import { Box, Card, Tooltip } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";

import { ArrowsClockwise, ChartBar, Target } from "@phosphor-icons/react";
import Link from "next/link";
import { useToast } from "~/app/_components/toast";
import { KeyResultUpdateForm } from "../../form/key-result-update-form";
import { KeyResultDeleteAlertModal } from "../../modal/alert-modal/key-result-delete-alert-modal";
import { CheckinModal } from "../../modal/check-in-modal";
import { KeyResultUpdateModal } from "../../modal/key-result-update-modal";
import { KeyResultName } from "./key-result-name";
import { KeyResultProgressRate } from "./key-result-progress-rate";

type KeyResultCardProps = {
  keyResult: KeyResult;
  progressRate: number;
  readonly?: boolean;
};

export const KeyResultCard = ({
  keyResult,
  progressRate,
  readonly = false,
}: KeyResultCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const openToast = useToast();

  const { mutate } = api.keyResult.deleteKeyResult.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: "KeyResultを削除しました",
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `KeyResultの削除に失敗しました ${error.message}`,
      });
    },
  });

  const deleteKeyResult = useCallback(() => {
    mutate({ id: keyResult.id });
  }, [keyResult.id, mutate]);

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Target size={20} />
          <Box>
            <KeyResultName name={keyResult.name} readonly={readonly} />
          </Box>
        </div>
        <KeyResultProgressRate progressRate={progressRate} />
      </div>
      {!readonly && (
        <div className="flex flex-row gap-2 justify-end pt-2">
          <CheckinModal keyResults={[keyResult]}>
            <ArrowsClockwise
              size={20}
              className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
            />
          </CheckinModal>
          <Tooltip content="ダッシュボードを見る" delayDuration={100}>
            <Link
              href={`${pathname}/key-result/${btoa(
                `KeyResultId:${keyResult.id}`,
              )}`}
            >
              <ChartBar
                size={20}
                className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
              />
            </Link>
          </Tooltip>

          <KeyResultUpdateModal>
            <KeyResultUpdateForm keyResult={keyResult} />
          </KeyResultUpdateModal>
          <KeyResultDeleteAlertModal onClick={deleteKeyResult} />
        </div>
      )}
    </Card>
  );
};
