"use client";

import type { Objective } from "@prisma/client";
import { OkrSection } from "~/app/_components/ui/section/okr-section";
import { TaskSection } from "~/app/_components/ui/section/task-section";
import type { KeyResultWithTasks } from "~/types";

type PageContentProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResultWithTasks>;
};

// レスポンシブ対応する
export const PageContent = ({
  createdById,
  objective,
  keyResults,
}: PageContentProps) => {
  const keyResultprogressRateList = keyResults.map((keyResult) =>
    Math.round((keyResult.currentValue / keyResult.targetValue) * 100),
  );

  const objectiveProgressRate = Math.round(
    keyResultprogressRateList.reduce((a, b) => a + b, 0) /
      keyResultprogressRateList.length,
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <OkrSection
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
