"use client";

import { ScrollArea } from "@radix-ui/themes";
import type { OkrTerm } from "@prisma/client";
import { createOkrTermMock } from "../_testdata/okr-term";
import { OkrTermCreateModal } from "../_components/modal/okr-term-create-modal";
import { OkrTermCard } from "../_components/card/okr-term-card";

type Props = {
  okrTerms: OkrTerm[];
};

export const PageContent = ({ okrTerms }: Props) => {
  const mockOkrTerms = createOkrTermMock();
  return (
    <>
      <div className="align-center flex justify-between">
        <span className="ml-6 text-[32px] font-bold">OKR期間</span>
        <OkrTermCreateModal />
      </div>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        className="mt-8 h-[560px] px-6"
      >
        {okrTerms.length > 0 && (
          <div>
            {okrTerms.map((okrTerm) => (
              <div key={okrTerm.id}>{okrTerm.name}</div>
            ))}
          </div>
        )}
        {okrTerms.length <= 0 && (
          <div className="flex flex-col gap-4 pt-4">
            {mockOkrTerms.map((okrTerm) => (
              <OkrTermCard
                key={okrTerm.id}
                name={okrTerm.name}
                startDate={okrTerm.startDate ?? ""}
                endDate={okrTerm.endDate ?? ""}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </>
  );
};
