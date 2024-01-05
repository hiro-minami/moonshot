import { Tooltip } from "@radix-ui/themes";
import { useMemo } from "react";

type KeyResultNameProps = {
  name: string;
  readonly: boolean;
};

export const KeyResultName = ({ name, readonly }: KeyResultNameProps) => {
  const width = useMemo<number>(
    () => Math.round(window.innerWidth * 0.145),
    [],
  );

  if (readonly) {
    return (
      <Tooltip content={name} delayDuration={100}>
        <p className="font-bold text-sm">{name}</p>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={name} delayDuration={100}>
      <p className="font-bold text-sm truncate ..." style={{ width }}>
        {name}
      </p>
    </Tooltip>
  );
};
