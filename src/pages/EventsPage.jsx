import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import { fetchEvents, fetchCategories } from "../services/eventService";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //write a getcategory names function that takes in an array of category ids and returns an array of category names

  const getCategoryNames = (categoryIds) => {
    const categoryNames = categoryIds.map((id) => {
      const category = categories.find((category) => category.id == id);
      return category;
    });

    return categoryNames.map((category) => category.name);
  };

  useEffect(() => {
    const getData = async () => {
      const eventsData = await fetchEvents();
      const categoriesData = await fetchCategories();
      setEvents(eventsData);
      setCategories(categoriesData);
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredEvents = () => {
      let filtered = events || [];
      if (searchTerm) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (selectedCategory) {
        filtered = filtered.filter((event) =>
          event.categoryIds.includes(Number(selectedCategory))
        );
      }
      setFilteredEvents(filtered);
    };
    filteredEvents();
  }, [searchTerm, events, selectedCategory]);

  //Add the following details when displaying an event: title, description, image, startTime & endTime, categories
  console.log(filteredEvents);

  return (
    <Box p="10">
      <Heading textAlign="center" mb="4">
        Events
      </Heading>
      <Flex justifyContent="space-between">
        <Input
          placeholder="Search Events"
          width="300px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb="4"
        />
        <Select
          placeholder="Filter by Category"
          width="300px"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          mb="4"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Button as={Link} to="/add-event" colorScheme="blue" mb="4">
        Add Event
      </Button>
      <Flex justifyContent="space-between" flexWrap="wrap">
        {filteredEvents.map((event) => (
          <Box
            as={Link}
            to={`/event/${event.id}`}
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            my="4"
          >
            <Image
              src={event.image || "https://via.placeholder.com/200"}
              alt={event.name}
              height="250px"
              maxWidth="100%"
              objectFit="cover"
            />
            <Box mt="4">
              <Text fontSize="2*l" fontWeight="semibold">
                {event.title}
              </Text>
              <Text>{event.description}</Text>
              <Text mt="2">
                Start:{new Date(event.startTime).toLocaleString()}
              </Text>
              <Text mt="2">End:{new Date(event.endTime).toLocaleString()}</Text>
              <Text mt="2">
                {getCategoryNames(event.categoryIds).join(", ")}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
