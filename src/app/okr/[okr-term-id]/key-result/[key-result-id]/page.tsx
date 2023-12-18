import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { extractId } from "~/utils";
import { PageContent } from "./page-content";

const KeyResult = async ({
  params,
}: {
  params: { "okr-term-id": string; "key-result-id": string };
}) => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const okrTermId = extractId(params["okr-term-id"]);
  const keyResultId = extractId(params["key-result-id"]);

  const okrTerm = await api.okrTerm.getOkrTerm.query({
    id: Number(okrTermId),
  });
  if (!okrTerm) return null;

  const keyResult = await api.keyResult.getKeyResultById.query({
    id: Number(keyResultId),
  });
  if (!keyResult) return null;

  return (
    <div className="px-12 py-[35px]">
      <PageContent keyResult={keyResult} />
    </div>
  );
};

export default KeyResult;
