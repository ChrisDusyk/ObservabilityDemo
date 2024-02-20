import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon
} from "@chakra-ui/react";
import { SiWwise } from "react-icons/si";
import { useSidenav } from "./SidenavContext";
import SidenavItems, { SidenavItem } from "./SideNavItems";

export interface SidenavProps {
	navItems: SidenavItem[];
}

function Sidenav({ navItems }: SidenavProps) {
	const { isOpen, onClose } = useSidenav();
	return(
		<>
			<VStack spacing={5} as="nav" display={{ base: "none", md: "flex" }}>
				<Icon as={SiWwise} boxSize={8} />
				<SidenavItems navItems={navItems} />
			</VStack>
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Student Management</DrawerHeader>
					<DrawerBody>
						<SidenavItems navItems={navItems} mode="over" />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Sidenav;