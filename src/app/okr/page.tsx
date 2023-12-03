import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PageContent } from "./page-content";
import { PleaseOkrCreateContent } from "../_components/please-okr-create-content";

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

  const keyResults = await api.keyResult.getKeyResults.query({
    createdById: session.user.id,
    okrTermId: okrTerm.id,
    objectiveId: objective.id,
  });

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
