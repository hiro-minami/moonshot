import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PageContent } from "./page-content";

const OkrTerms = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const okrTerms = await api.okrTerm.getOkrTerms.query();

  return (
    <div className="p-12">
      <PageContent okrTerms={okrTerms} createdById={session.user.id} />
    </div>
  );
};

export default OkrTerms;
