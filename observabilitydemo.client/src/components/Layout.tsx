import { IconButton } from "@chakra-ui/react";
import { FaHome, FaAddressBook, FaChalkboard } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { SidenavItem } from "./sidenav/SideNavItems";
import Sidenav from "./sidenav/Sidenav";
import SidenavContainer from "./sidenav/SidenavContainer";
import { useSidenav } from "./sidenav/SidenavContext";

export default function Layout() {
  const navItems: SidenavItem[] = [
    { icon: FaHome, label: "Home", to: "" },
    { icon: FaAddressBook, label: "Students", to: "students" },
    { icon: FaChalkboard, label: "Courses", to: "courses" },
  ];
  const { onOpen } = useSidenav();

  return (
    <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
      <IconButton
        aria-label="menu"
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
      <Outlet />
    </SidenavContainer>
  );
}
