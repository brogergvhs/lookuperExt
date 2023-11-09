import Nav from "@/components/Nav";
import { useRouter } from "next/router";

export default function Layout({children}) {
  const router = useRouter();
  const {pathname} = router;

  return (<>
    {pathname.includes('/welcome') ? ('') : (
      <Nav />
    )}
    <div className="bg-mainBg min-h-[calc(100vh-75px)] rounded-xl mx-auto max-w-[1200px]">
      <div className="flex">
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div></>
  );
}
