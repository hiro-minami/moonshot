"use client";

import type { Objective } from "@prisma/client";
import { OkrSection } from "~/app/_components/ui/section/okr-section";
import { TaskSection } from "~/app/_components/ui/section/task-section";
import type { KeyResultWithTasks } from "~/types";

type PageContentProps = {
  okrTermId: number;
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResultWithTasks>;
};

export const PageContent = ({
  okrTermId,
  createdById,
  objective,
  keyResults,
}: PageContentProps) => {
  const keyResultprogressRateList = keyResults.map((keyResult) =>
    keyResult.targetValue !== 0
      ? Math.round((keyResult.currentValue / keyResult.targetValue) * 100)
      : 0,
  );

  const objectiveProgressRate = Math.round(
    keyResultprogressRateList.reduce((a, b) => a + b, 0) /
      keyResultprogressRateList.length,
  );

  return (
    <div className="grid grid-cols-3 gap-8">
      <OkrSection
        okrTermId={okrTermId}
        createdById={createdById}
        objective={objective}
        keyResults={keyResults}
        objectiveProgressRate={objectiveProgressRate}
        keyResultprogressRateList={keyResultprogressRateList}
      />
      <TaskSection
        createdById={createdById}
        objective={objective}
        keyResults={keyResults}
      />
    </div>
  );
};
