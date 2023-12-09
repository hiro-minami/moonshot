"use client";

import { ObjectiveCreateForm } from "~/app/_components/ui/form/objective-create-form";
import { ObjectiveCreateModal } from "~/app/_components/ui/modal/objective-create-modal";

type PleaseOkrCreateContentProps = {
  createdById: string;
};

export const PleaseOkrCreateContent = ({
  createdById,
}: PleaseOkrCreateContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-[200px]">
      <span className="text-[32px] font-bold">
        ワクワクするようなObjectiveを作成してOKRを始めましょう！
      </span>
      <ObjectiveCreateModal>
        <ObjectiveCreateForm createdById={createdById} />
      </ObjectiveCreateModal>
    </div>
  );
};
