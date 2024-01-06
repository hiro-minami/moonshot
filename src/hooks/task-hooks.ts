import { useMemo } from "react";
import type { KeyResultWithTasks } from "~/types";
import { countTasksByDate, groupTasksByDate } from "~/utils";

export const useTaskMetrics = (keyResult: KeyResultWithTasks) => {
  const taskCount = useMemo(() => keyResult.tasks.length, [keyResult.tasks]);
  const finishTaskCount = useMemo(
    () => keyResult.tasks.filter((task) => task.isDone).length,
    [keyResult.tasks],
  );

  const completedTasks = useMemo(
    () => keyResult.tasks.filter((task) => task.isDone && task.endDate),
    [keyResult.tasks],
  );

  const tasksByDate = useMemo(
    () => groupTasksByDate(completedTasks),
    [completedTasks],
  );
  const taskCountsByDate = useMemo(
    () => countTasksByDate(tasksByDate),
    [tasksByDate],
  );

  const dates = useMemo(
    () => taskCountsByDate.map((task) => task.date),
    [taskCountsByDate],
  );
  const counts = useMemo(
    () => taskCountsByDate.map((task) => task.count),
    [taskCountsByDate],
  );

  const progressRate = useMemo(
    () => Math.round((keyResult.currentValue / keyResult.targetValue) * 100),
    [keyResult.currentValue, keyResult.targetValue],
  );

  const unfinishedTaskCount = useMemo(
    () => taskCount - finishTaskCount,
    [taskCount, finishTaskCount],
  );

  const taskCompletionRate = useMemo(
    () =>
      taskCount !== 0 ? Math.floor((finishTaskCount / taskCount) * 100) : 0,
    [taskCount, finishTaskCount],
  );

  return {
    taskCount,
    finishTaskCount,
    dates,
    counts,
    progressRate,
    unfinishedTaskCount,
    taskCompletionRate,
  };
};
