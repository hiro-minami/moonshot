"use client";

import type { KeyResult } from "@prisma/client";
import { KeyResultCreateForm } from "../../form/key-result-create-form";
import { CheckinModal } from "../../modal/check-in-modal";
import { KeyResultCreateModal } from "../../modal/key-result-crate-modal";

type TopSectionProps = {
  okrTermId: number;
  createdById: string;
  objectiveId: number;
  keyResults: ReadonlyArray<KeyResult>;
};
export const TopSection = ({
  okrTermId,
  createdById,
  objectiveId,
  keyResults,
}: TopSectionProps) => {
  return (
    <div className="align-center flex justify-between">
      <span className="text-[32px] font-bold">目標</span>
      {keyResults.length > 0 ? (
        <CheckinModal keyResults={keyResults} />
      ) : (
        <KeyResultCreateModal>
          <KeyResultCreateForm
            okrTermId={okrTermId}
            createdById={createdById}
            objectiveId={objectiveId}
          />
        </KeyResultCreateModal>
      )}
    </div>
  );
};
