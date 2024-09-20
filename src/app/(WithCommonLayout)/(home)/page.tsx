import Landing from "@/src/components/modules/home/Landing";
import RecentPosts from "@/src/components/modules/home/RecentPosts";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Landing />
      {/* <Suspense fallback={<p>Loading...</p>}>
        <RecentPosts />
      </Suspense> */}
    </>
  );
}
