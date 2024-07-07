"use client";

import { Rocket } from "@phosphor-icons/react";
import type { Objective } from "@prisma/client";
import { Card, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useToast } from "~/app/_components/toast";
import { api } from "~/trpc/react";
import { ObjectiveUpdateForm } from "../../form/objective-update-form";
import { ObjectiveDeleteAlertModal } from "../../modal/alert-modal/objective-delete-alert-modal";
import { ObjectiveUpdateModal } from "../../modal/objective-update-modal";
import { ProgressBar } from "../../progress-bar";

type ObjectiveCardProps = {
  objective: Objective;
  progressRate: number;
};

export const ObjectiveCard = ({
  objective,
  progressRate,
}: ObjectiveCardProps) => {
  const router = useRouter();
  const openToast = useToast();
  const width = useMemo<number>(() => Math.round(window.innerWidth * 0.21), []);

  const { mutate } = api.objective.deleteObjective.useMutation({
    onSuccess: () => {
      openToast({
        type: "success",
        title: "Objectiveを削除しました",
      });
      router.refresh();
    },
    onError: (error) => {
      openToast({
        type: "error",
        title: `Objectiveの削除に失敗しました ${error.message}`,
      });
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
            <Rocket size={20} />
            <Tooltip content={objective.name} delayDuration={100}>
              <p className="font-bold text-sm truncate ..." style={{ width }}>
                {objective.name}
              </p>
            </Tooltip>
          </div>
          <ProgressBar progressRate={progress} />
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <ObjectiveUpdateModal>
            <ObjectiveUpdateForm objective={objective} />
          </ObjectiveUpdateModal>
          <ObjectiveDeleteAlertModal onClick={deleteObjective} />
        </div>
      </div>
    </Card>
  );
};
