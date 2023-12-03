"use client";

import type { KeyResult, Objective } from "@prisma/client";
import { ObjectiveCard } from "~/app/_components/card/objective-card";
import { KeyResultCreateModal } from "../_components/modal/key-result-crate-modal";
import { KeyResultCreateForm } from "../_components/form/key-result-create-form";
import { KeyResultCard } from "../_components/card/key-result-card";
import { CheckinModal } from "../_components/modal/check-in-modal";
import { CheckinForm } from "../_components/form/check-in-form";

type PageContentProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResult>;
};

// TODO: ObjectiveCardとKeyResultCardをtreeのように表示する
export const PageContent = ({
  createdById,
  objective,
  keyResults,
}: PageContentProps) => {
  const progressRateList = keyResults.map((keyResult) =>
    Math.round((keyResult.currentValue / keyResult.targetValue) * 100),
  );

  const objectiveProgressRate = Math.round(
    progressRateList.reduce((a, b) => a + b, 0) / progressRateList.length,
  );
  return (
    <>
      <div className="align-center flex justify-between">
        <span className="text-[32px] font-bold">OKR</span>
        {keyResults.length > 0 ? (
          <CheckinModal>
            <CheckinForm keyResults={keyResults} />
          </CheckinModal>
        ) : (
          <KeyResultCreateModal>
            <KeyResultCreateForm
              createdById={createdById}
              objectiveId={objective.id}
            />
          </KeyResultCreateModal>
        )}
      </div>

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
            id={keyResult.id}
            name={keyResult.name}
            progressRate={progressRateList[i]!}
          />
        ))}
      </div>
    </>
  );
};
