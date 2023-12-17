import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    // TODO: Home画面を作成したら、その画面に遷移するようにする
    const redirectUrl = "/okr-terms";
    return redirect(redirectUrl);
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="flex flex-col items-center gap-2">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
