"use client";

import { ObjectiveCreateForm } from "~/app/_components/ui/form/objective-create-form";
import { ObjectiveCreateModal } from "~/app/_components/ui/modal/objective-create-modal";

type PleaseTaskCreateContentProps = {
  createdById: string;
};

export const PleaseTaskCreateContent = ({
  createdById,
}: PleaseTaskCreateContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-[200px]">
      <span className="text-[32px] font-bold">
        KRを達成するために必要なTaskを作成しましょう！
      </span>
      <ObjectiveCreateModal>
        <ObjectiveCreateForm createdById={createdById} />
      </ObjectiveCreateModal>
    </div>
  );
};
