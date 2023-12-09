import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PleaseOkrCreateContent } from "../_components/ui/section/okr-section";
import { PageContent } from "./page-content";

const Okr = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const okrTerm = await api.okrTerm.getCurrentOkrTerm.query();
  console.log("okrTerm", okrTerm);
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
