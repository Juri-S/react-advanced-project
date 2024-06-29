import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, } from '@chakra-ui/react';

export const NavLink = ({to, children}) => {
  return (
    <Link as={Link} to={to} p="2" _hover={{textDecoration: 'underline'}}>{children}</Link>
  );
};
