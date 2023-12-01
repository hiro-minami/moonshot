import { TargetIcon } from "@radix-ui/react-icons";
import { Card, Box, Text, Button, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";

type KeyResultCardProps = {
  id: number;
  name: string;
  progressRate: number;
};

// TODO: 削除ボタンはアイコンにする
// TODO: progress barを押下すると、KeyResultの編集モーダルを表示するようにする
export const KeyResultCard = ({
  id,
  name,
  progressRate,
}: KeyResultCardProps) => {
  const router = useRouter();

  const { mutate } = api.keyResult.deleteKeyResult.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteKeyResult = useCallback(() => {
    mutate({ id });
  }, [id, mutate]);

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[12px]">
          <TargetIcon className="w-[30px]" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {name}
            </Text>
          </Box>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Tooltip content={`${progressRate}%`}>
            <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
              <div
                className="h-full rounded-full bg-[#9f53ec]"
                style={{ width: `${progressRate}%` }}
              />
            </div>
          </Tooltip>
          <Button
            className="bg-[#9f53ec] hover:bg-[#9f53ec]/80"
            onClick={deleteKeyResult}
          >
            削除
          </Button>
        </div>
      </div>
    </Card>
  );
};
