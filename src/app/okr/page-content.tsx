"use client";

import type { KeyResult, Objective } from "@prisma/client";
import { ObjectiveCard } from "~/app/_components/card/objective-card";
import { KeyResultCreateModal } from "../_components/modal/key-result-crate-modal";
import { KeyResultCreateForm } from "../_components/form/key-result-create-form";
import { KeyResultCard } from "../_components/card/key-result-card";

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
  return (
    <>
      <div className="align-center flex justify-between">
        <span className="ml-6 text-[32px] font-bold">OKR</span>
        {/* TODO: チェックインモーダルをここに配置するようにする */}
        <KeyResultCreateModal>
          <KeyResultCreateForm
            createdById={createdById}
            objectiveId={objective.id}
          />
        </KeyResultCreateModal>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <ObjectiveCard id={objective.id} name={objective.name} />
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
