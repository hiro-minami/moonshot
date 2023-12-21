import type { KeyResult } from "@prisma/client";
import { TargetIcon } from "@radix-ui/react-icons";
import { Box, Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";

import { OptionButton } from "../_components";
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
            <KeyResultName
              id={keyResult.id}
              name={keyResult.name}
              readonly={readonly}
            />
          </Box>
        </div>
        <div className="flex flex-row items-center gap-4">
          <KeyResultProgressRate {...{ keyResult, progressRate, readonly }} />
          {!readonly && (
            <OptionButton onClick={deleteKeyResult} keyResult={keyResult} />
          )}
        </div>
      </div>
    </Card>
  );
};
