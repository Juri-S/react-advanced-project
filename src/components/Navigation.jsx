import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text,} from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <nav style={{borderBottom:"1px solid #ccc"}} >
      <Flex align="center" justify="space-between" p="10">
        <Box>
          <Text fontSize="xl" fontWeight="bold">Event Manager</Text>
        </Box>
        <Flex>
          <NavLink to="/" style={{color:"blue"}}>Home</NavLink>
          
        </Flex>
      </Flex>
    </nav>
  );
};
