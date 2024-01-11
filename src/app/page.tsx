import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) {
    const redirectUrl = "/okr-terms";
    return redirect(redirectUrl);
  } else {
    const redirectUrl = "/login";
    return redirect(redirectUrl);
  }
}
