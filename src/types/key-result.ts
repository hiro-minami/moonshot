import type { KeyResult } from "@prisma/client";

export type KeyResultWithTasks = KeyResult & {
  tasks: ReadonlyArray<Task>;
};

export type Task = {
  id: number;
  name: string;
  keyResultId: number;
  isDone: boolean;
  startDate: Date;
  endDate: Date | null;
};
