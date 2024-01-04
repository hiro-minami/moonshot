"use client";

import { RocketLaunch, Trash } from "@phosphor-icons/react";
import type { Objective } from "@prisma/client";
import { Card, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { api } from "~/trpc/react";
import { ObjectiveUpdateForm } from "../../form/objective-update-form";
import { ObjectiveUpdateModal } from "../../modal/objective-update-modal";

type ObjectiveCardProps = {
  objective: Objective;
  progressRate: number;
};

export const ObjectiveCard = ({
  objective,
  progressRate,
}: ObjectiveCardProps) => {
  const router = useRouter();
  const width = useMemo<number>(() => Math.round(window.innerWidth * 0.21), []);

  const { mutate } = api.objective.deleteObjective.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteObjective = useCallback(() => {
    mutate({ id: objective.id });
  }, [objective, mutate]);

  const progress = isNaN(progressRate) ? 0 : progressRate;

  return (
    <Card className="w-[100%]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <RocketLaunch size={20} />
            <Tooltip content={objective.name} delayDuration={100}>
              <p className="font-bold text-sm truncate ..." style={{ width }}>
                {objective.name}
              </p>
            </Tooltip>
          </div>
          <Tooltip content={`${progress}%`} delayDuration={100}>
            <div className="h-2.5 w-[100px] rounded-full  bg-gray-200">
              <div
                className="h-full rounded-full bg-[#9f53ec]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Tooltip>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <ObjectiveUpdateModal>
            <ObjectiveUpdateForm objective={objective} />
          </ObjectiveUpdateModal>

          <Tooltip content="削除する" delayDuration={100}>
            <Trash
              size={20}
              className="cursor-pointer text-[#9CA3AF] hover:text-[#9f53ec]"
              onClick={deleteObjective}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};
