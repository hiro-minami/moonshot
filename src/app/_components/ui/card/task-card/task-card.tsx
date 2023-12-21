import { Card, Text } from "@radix-ui/themes";

type TaskCardProps = {
  name: string;
  count: number;
};

export const TaskCard = ({ name, count }: TaskCardProps) => {
  return (
    <Card className="w-[100%] h-[100px]">
      <div className="flex flex-col gap-4 items-center">
        <Text as="div" size="2" weight="regular">
          {name}
        </Text>
        <Text as="div" size="8" weight="bold" className="text-[#9f53ec]">
          {count}
        </Text>
      </div>
    </Card>
  );
};
