"use client";

import type { KeyResult, Objective } from "@prisma/client";

import { KeyResultCard } from "../../card/key-result-card";
import { ObjectiveCard } from "../../card/objective-card";
import { TopSection } from "./top-section";

type OkrSectionProps = {
  okrTermId: number;
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResult>;
  objectiveProgressRate: number;
  keyResultprogressRateList: ReadonlyArray<number>;
};

export const OkrSection = ({
  okrTermId,
  createdById,
  objective,
  keyResults,
  objectiveProgressRate,
  keyResultprogressRateList,
}: OkrSectionProps) => {
  return (
    <div className="col-span-1">
      <TopSection
        okrTermId={okrTermId}
        createdById={createdById}
        objectiveId={objective.id}
        keyResults={keyResults}
      />
      <div className="flex flex-col gap-4 pt-4">
        <ObjectiveCard
          objective={objective}
          progressRate={objectiveProgressRate}
        />
      </div>
      <div className="flex flex-col gap-4 pl-[60px] pt-4 relative">
        <div className="absolute left-10 top-0 bottom-8 border-l-2 border-[#9f53ec]" />
        {keyResults.map((keyResult, i) => (
          <div key={keyResult.id} className="relative pl-4">
            <div className="absolute left-[-20px] top-10 border-t-2 border-[#9f53ec] w-9" />
            <KeyResultCard
              keyResult={keyResult}
              progressRate={keyResultprogressRateList[i]!}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
