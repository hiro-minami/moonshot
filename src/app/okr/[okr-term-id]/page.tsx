import { PleaseOkrCreateContent } from "~/app/_components/ui/section/okr-section";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PageContent } from "./page-content";

const Okr = async ({ params }: { params: { "okr-term-id": string } }) => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const okrTermId = atob(decodeURIComponent(params["okr-term-id"])).split(
    ":",
  )[1];

  const okrTerm = await api.okrTerm.getOkrTerm.query({
    id: Number(okrTermId),
  });
  if (!okrTerm) return null;

  const objective = await api.objective.getObjective.query({
    okrTerm: okrTerm.id,
  });

  if (!objective)
    return <PleaseOkrCreateContent createdById={session.user.id} />;

  const keyResultsQuery = await api.keyResult.getKeyResults.query({
    createdById: session.user.id,
    okrTermId: okrTerm.id,
    objectiveId: objective.id,
  });
  const keyResults = keyResultsQuery.sort((a, b) => a.id - b.id);

  return (
    <div className="p-12">
      <PageContent
        objective={objective}
        keyResults={keyResults}
        createdById={session.user.id}
      />
    </div>
  );
};

export default Okr;
