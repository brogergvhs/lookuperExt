import {useRouter} from "next/router";
import Link from "next/link";

export default function Nav() {
  const menuItems = [
    {url: "/favourites", icon: "", color: ""},
    {url: "/history", icon: "", color: ""},
    {url: "input"},
    {url: "/settings", icon: "", color: ""},
  ];
  const router = useRouter();
  const {pathname} = router;

  return (
    <div className="navBar">
        <h2 class="text-center">Words checked: 
            {{wordAmount}}
            <span class="sec-color">({{fetchAmount}})</span>
        </h2>
        <div className="actions">
            {menuItems.map((item, index) => (
                {...item.url == "input" ? (
                    <input placeholder="Check some words"/>
                ) : (
                    <Link className={pathname.includes(item.url) ? 'btn btn-sm btn-outline-info me-3' : ''} href={item.url}>
                        {item.icon}
                    </Link>
                )}
            ))}
        </div>
    </div>
  );
}