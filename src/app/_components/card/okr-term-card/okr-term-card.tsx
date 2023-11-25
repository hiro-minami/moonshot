import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";

type OkrTermCardProps = {
  name: string;
  startDate: Date;
  endDate: Date;
};

export const OkrTermCard = ({ name, startDate, endDate }: OkrTermCardProps) => {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <Card className="w-[100%]">
      <Flex gap="3" align="center">
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {name}
          </Text>
          <Text as="div" size="2" weight="bold">
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
