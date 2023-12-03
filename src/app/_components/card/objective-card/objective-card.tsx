import { RocketIcon } from "@radix-ui/react-icons";
import { Card, Box, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import { OptionButton } from "../_components";

type ObjectiveCardProps = {
  id: number;
  name: string;
};

// TODO: 削除ボタンは、Objectiveに紐づくKeyResultがない場合のみ表示する
export const ObjectiveCard = ({ id, name }: ObjectiveCardProps) => {
  const router = useRouter();

  const { mutate } = api.objective.deleteObjective.useMutation({
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
        <div className="flex flex-row items-center gap-[12px]">
          <RocketIcon className="w-[30px]" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {name}
            </Text>
          </Box>
        </div>
        <OptionButton onClick={deleteOkrTerm} />
      </div>
    </Card>
  );
};
