"use client";

import type { Objective } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { ObjectiveCard } from "~/app/_components/card/objective-card";

type PageContentProps = {
  createdById: string;
  objective: Objective;
};

export const PageContent = ({ objective }: PageContentProps) => {
  return (
    <>
      <div className="align-center flex justify-between">
        <span className="ml-6 text-[32px] font-bold">OKR</span>
        <Button className="bg-[#9f53ec] p-5 hover:bg-[#9f53ec]/80">
          Key Resultの作成
        </Button>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <ObjectiveCard id={objective.id} name={objective.name} />
      </div>
    </>
  );
};
