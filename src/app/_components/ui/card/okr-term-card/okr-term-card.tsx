import { Avatar, Box, Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "~/trpc/react";
import { OptionButton } from "../_components";

type OkrTermCardProps = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
};

export const OkrTermCard = ({
  id,
  name,
  startDate,
  endDate,
}: OkrTermCardProps) => {
  const router = useRouter();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { mutate } = api.okrTerm.deleteOkrTerm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteOkrTerm = useCallback(() => {
    mutate({ id });
  }, [id, mutate]);

  // TODO: OKR期間を押下すると、それぞれのOKR期間の詳細ページに遷移するようにする
  return (
    <Card className="w-[100%]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[16px]">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Link href={`/okr/${btoa(`OkrTermId:${id}`)}`}>
              <Text as="div" size="2" weight="bold">
                {name}
              </Text>
            </Link>
            <Text as="div" size="2" weight="bold">
              {formatDate(startDate)} ~ {formatDate(endDate)}
            </Text>
          </Box>
        </div>
        <OptionButton onClick={deleteOkrTerm} />
      </div>
    </Card>
  );
};
