import { RocketIcon } from "@radix-ui/react-icons";
import { Card, Box, Text, Button } from "@radix-ui/themes";
import * as Progress from "@radix-ui/react-progress";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";

type KeyResultCardProps = {
  id: number;
  name: string;
  progressRate: number;
};

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
          <RocketIcon className="w-[30px]" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {name}
            </Text>
          </Box>
        </div>
        <Progress.Root value={progressRate}>
          <Progress.Indicator className="h-[10px] w-[100px] rounded-[10px] bg-[#9f53ec]" />
        </Progress.Root>
        <Button
          className="bg-[#9f53ec] hover:bg-[#9f53ec]/80"
          onClick={deleteKeyResult}
        >
          削除
        </Button>
      </div>
    </Card>
  );
};
