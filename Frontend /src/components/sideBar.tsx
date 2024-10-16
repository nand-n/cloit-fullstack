"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { Icon } from "./commons/icon";
import ToastMessage from "./commons/toastMessage";

interface SideBarComponentProps {
  children: ReactNode;
}

const items = [
  {
    key: "/systems",
    label: "Systems",
    icon: (
      <Icon src={"/icons/folder.svg"} alt="Systems" width={20} height={20} />
    ),
    className: "font-bold",
    children: [
      {
        key: "/system-code",
        label: "System Code",
        icon: (
          <Icon
            src={"/icons/submenu.svg"}
            alt="System Code"
            width={20}
            height={20}
          />
        ),
      },
      {
        key: "/properties",
        label: "Properties",
        icon: (
          <Icon
            src={"/icons/submenu.svg"}
            alt="Properties"
            width={20}
            height={20}
          />
        ),
      },
      {
        key: "/menues",
        label: "Menus",
        icon: (
          <Icon src={"/icons/submenu.svg"} alt="Menus" width={20} height={20} />
        ),
      },
      {
        key: "/api-lists",
        label: "API Lists",
        icon: (
          <Icon
            src={"/icons/submenu.svg"}
            alt="API Lists"
            width={20}
            height={20}
          />
        ),
      },
    ],
  },
  {
    key: "/users-and-groups",
    label: "Users & Groups",
    icon: <CiSettings />,
  },
  {
    key: "/competition",
    label: "Competition",
    icon: <CiSettings />,
  },
];

const SideBar: React.FC<SideBarComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const router = useRouter();
  const pathName = usePathname();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleMenuClick = (e: string) => {
    router.push(e);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastMessage />
      <aside
        className={`bg-blue_gray text-white h-full transition-all duration-300 z-50 rounded-r-xl ${
          collapsed ? "w-20" : "w-80"
        } ${isMobile && mobileCollapsed ? "hidden" : "block"}`}
      >
        <div className="flex justify-between items-center mt-4 p-4">
          {!collapsed && <Icon src="/icons/logo.svg" alt="Logo" />}
          <button onClick={toggleCollapsed} className="p-2">
            {collapsed ? (
              <Icon
                src="/icons/expand.svg"
                alt="Expand"
                width={20}
                height={20}
              />
            ) : (
              <Icon
                src="/icons/collapse.svg"
                alt="Collapse"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>

        <nav className="mt-8 mx-4">
          <ul>
            {items.map((item) => (
              <li className="" key={item.key}>
                <div
                  className={`flex items-center p-3 ${
                    item.label === "Systems" &&
                    "rounded-xl rounded-b-none bg-blue_gray_800"
                  }`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="ml-4">{item.label}</span>}
                </div>
                {item.children && !collapsed && (
                  <ul className="rounded-xl rounded-t-none bg-blue_gray_800  pb-3">
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.key}
                        onClick={() => handleMenuClick(subItem.key)}
                        className={`flex items-center p-2 cursor-pointer py-4  rounded-2xl ${
                          pathName === subItem.key
                            ? "bg-lime_green text-black font-semibold  "
                            : "hover:bg-blue_gray_800"
                        }`}
                      >
                        <span>{subItem.icon}</span>
                        <span className="ml-4 ">{subItem.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        className={`transition-all duration-300 flex-1 p-6 h-full overflow-y-auto`}
      >
        {children}
      </main>
    </div>
  );
};

export default SideBar;
