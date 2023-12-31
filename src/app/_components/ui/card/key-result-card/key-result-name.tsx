import { Tooltip } from "@radix-ui/themes";

type KeyResultNameProps = {
  name: string;
  readonly: boolean;
};

export const KeyResultName = ({ name, readonly }: KeyResultNameProps) => {
  if (readonly) {
    return (
      <Tooltip content={name} delayDuration={100}>
        <p className="font-bold text-sm">{name}</p>
      </Tooltip>
    );
  }
  return (
    <Tooltip content={name} delayDuration={100}>
      <p className="font-bold text-sm w-[200px] truncate ...">{name}</p>
    </Tooltip>
  );
};
