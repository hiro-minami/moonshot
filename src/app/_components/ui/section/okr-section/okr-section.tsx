import type { KeyResult, Objective } from "@prisma/client";
import { TopSection } from ".";
import { KeyResultCard } from "../../card/key-result-card";
import { ObjectiveCard } from "../../card/objective-card";

type OkrSectionProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResult>;
  objectiveProgressRate: number;
  keyResultprogressRateList: ReadonlyArray<number>;
};

export const OkrSection = ({
  createdById,
  objective,
  keyResults,
  objectiveProgressRate,
  keyResultprogressRateList,
}: OkrSectionProps) => {
  return (
    <div>
      <TopSection
        createdById={createdById}
        objectiveId={objective.id}
        keyResults={keyResults}
      />
      <div className="flex flex-col gap-4 pt-4">
        <ObjectiveCard
          id={objective.id}
          name={objective.name}
          progressRate={objectiveProgressRate}
        />
      </div>
      <div className="flex flex-col gap-4 pl-[100px] pt-4">
        {keyResults.map((keyResult, i) => (
          <KeyResultCard
            key={keyResult.id}
            keyResult={keyResult}
            progressRate={keyResultprogressRateList[i]!}
          />
        ))}
      </div>
    </div>
  );
};
