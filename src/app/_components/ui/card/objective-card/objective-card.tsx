import { RocketIcon } from "@radix-ui/react-icons";
import { Card, Text, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import { OptionButton } from "../_components";

type ObjectiveCardProps = {
  id: number;
  name: string;
  progressRate: number;
};

export const ObjectiveCard = ({
  id,
  name,
  progressRate,
}: ObjectiveCardProps) => {
  const router = useRouter();

  const { mutate } = api.objective.deleteObjective.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteObjective = useCallback(() => {
    mutate({ id });
  }, [id, mutate]);

  const progress = isNaN(progressRate) ? 0 : progressRate;

  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[12px]">
          <RocketIcon className="w-[30px]" />
          <Text as="div" size="2" weight="bold">
            {name}
          </Text>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Tooltip content={`${progress}%`}>
            <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
              <div
                className="h-full rounded-full bg-[#9f53ec]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Tooltip>
          <OptionButton onClick={deleteObjective} />
        </div>
      </div>
    </Card>
  );
};
