import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

type KeyResultNameProps = {
  id: number;
  name: string;
  readonly: boolean;
};

export const KeyResultName = ({ id, name, readonly }: KeyResultNameProps) => {
  const pathname = usePathname();
  if (readonly) {
    return (
      <Text as="div" size="2" weight="bold">
        {name}
      </Text>
    );
  }
  return (
    <Link href={`${pathname}/key-result/${btoa(`KeyResultId:${id}`)}`}>
      <Text as="div" size="2" weight="bold">
        {name}
      </Text>
    </Link>
  );
};
