/* eslint-disable react/prop-types */
import { Flex, Heading, Button, Image } from "@chakra-ui/react";

import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

const Header = ({ colorMode, toggleColorMode }) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Heading as="h2" size="xl" color="white" letterSpacing={".5em"}>
        TODO
      </Heading>
      <Button
        variant={"ghost"}
        onClick={toggleColorMode}
        _hover="none"
        _active="none"
      >
        <Image src={colorMode === "light" ? moonIcon : sunIcon} />
      </Button>
    </Flex>
  );
};

export default Header;
