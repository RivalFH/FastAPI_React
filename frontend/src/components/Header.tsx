import React from "react";
import { Heading, Flex, Separator } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="Center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="Grey"
      width="100%"
      position="align"
      top="0"
      left="0"
      right="0"
      zIndex="500"
    >
      <Flex align="center" as="nav" mr={2}>
        <Heading as="h1" size="sm">Tutor Heading</Heading>
        <Separator />
      </Flex>
    </Flex>
  );
};

export default Header;