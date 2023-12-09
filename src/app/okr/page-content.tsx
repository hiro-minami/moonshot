"use client";

import type { KeyResult, Objective } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import { OkrSection } from "../_components/ui/section/okr-section";

type PageContentProps = {
  createdById: string;
  objective: Objective;
  keyResults: ReadonlyArray<KeyResult>;
};

export const PageContent = ({
  createdById,
  objective,
  keyResults,
}: PageContentProps) => {
  const keyResultprogressRateList = keyResults.map((keyResult) =>
    Math.round((keyResult.currentValue / keyResult.targetValue) * 100),
  );

  const objectiveProgressRate = Math.round(
    keyResultprogressRateList.reduce((a, b) => a + b, 0) /
      keyResultprogressRateList.length,
  );
  return (
    <Grid columns="2" gap="3" width="auto">
      <OkrSection
        createdById={createdById}
        objective={objective}
        keyResults={keyResults}
        objectiveProgressRate={objectiveProgressRate}
        keyResultprogressRateList={keyResultprogressRateList}
      />
    </Grid>
  );
};
