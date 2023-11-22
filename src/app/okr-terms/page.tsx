import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PageContent } from "./page-content";

const OkrTerms = async () => {
  const session = await getServerAuthSession();
  console.log(session);
  if (!session?.user) return null;

  const okrTerms = await api.okrTerm.getOkrTerms.query();

  return (
    <div className="p-12">
      <PageContent okrTerms={okrTerms} />
    </div>
  );
};

export default OkrTerms;
