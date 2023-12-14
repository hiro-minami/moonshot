import type { KeyResult } from "@prisma/client";
import { TargetIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Text, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";

import { CheckinModal } from "../../modal/check-in-modal";
import { OptionButton } from "../_components";

type KeyResultCardProps = {
  keyResult: KeyResult;
  progressRate: number;
};

export const KeyResultCard = ({
  keyResult,
  progressRate,
}: KeyResultCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = api.keyResult.deleteKeyResult.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteKeyResult = useCallback(() => {
    mutate({ id: keyResult.id });
  }, [keyResult.id, mutate]);

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[12px]">
          <TargetIcon className="w-[30px]" />
          <Box>
            <Link
              href={`${pathname}/key-result/${btoa(
                `KeyResultId:${keyResult.id}`,
              )}`}
            >
              <Text as="div" size="2" weight="bold">
                {keyResult.name}
              </Text>
            </Link>
          </Box>
        </div>
        <div className="flex flex-row items-center gap-4">
          <CheckinModal keyResults={[keyResult]}>
            <Button className="p-0 h-0">
              <Tooltip content={`${progressRate}%`}>
                <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#9f53ec]"
                    style={{ width: `${progressRate}%` }}
                  />
                </div>
              </Tooltip>
            </Button>
          </CheckinModal>
          <OptionButton onClick={deleteKeyResult} keyResult={keyResult} />
        </div>
      </div>
    </Card>
  );
};
