"use client";

import type { OkrTerm } from "@prisma/client";
import { ScrollArea } from "@radix-ui/themes";
import { OkrTermCard } from "../_components/ui/card/okr-term-card";
import { OkrTermCreateForm } from "../_components/ui/form/okr-term-create-form";
import { OkrTermCreateModal } from "../_components/ui/modal/okr-term-create-modal";

type Props = {
  okrTerms: OkrTerm[];
  createdById: string;
};

export const PageContent = ({ okrTerms, createdById }: Props) => {
  return (
    <>
      <div className="align-center flex justify-between">
        <span className="ml-6 text-[32px] font-bold">OKR期間</span>
        <OkrTermCreateModal>
          <OkrTermCreateForm createdById={createdById} />
        </OkrTermCreateModal>
      </div>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        className="mt-8 h-[560px] px-6"
      >
        {okrTerms.length > 0 ? (
          <div className="flex flex-col gap-4 pt-4">
            {okrTerms.map((okrTerm) => (
              <OkrTermCard key={okrTerm.id} okrTerm={okrTerm} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-4">no Okr Terms</div>
        )}
      </ScrollArea>
    </>
  );
};
