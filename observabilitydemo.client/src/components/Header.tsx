import { Flex, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      zIndex={200}
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Heading as="h3" size="xl">
        Dusyk University
      </Heading>
    </Flex>
  );
}
