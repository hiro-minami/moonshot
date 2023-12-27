import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { Login } from "./login";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    // TODO: Home画面を作成したら、その画面に遷移するようにする
    const redirectUrl = "/okr-terms";
    return redirect(redirectUrl);
  }

  return <Login session={session!} />;
}
