import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Box, Image, Text, Button, Spinner,useToast } from '@chakra-ui/react';
import { fetchEvent, fetchUser, fetchCategories, updateEvent, deleteEvent } from '../services/eventService';
import { EditEventModal } from '../components/EditEventModal';

export const EventPage = () => {

const {eventId} = useParams();
const [event, setEvent] = useState(null);
const [createdBy, setCreatedBy] = useState({});
const [categories, setCategories] = useState([]);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const toast = useToast();
const navigate = useNavigate();


  //write a getcategory names function that takes in an array of category ids and returns an array of category names

  const getCategoryNames= (categoryIds) => {
    
    const categoryNames = categoryIds.map((id) => {
      const category = categories.find((category) => category.id ==  id);
      return category 
    
    })
  
    
    return categoryNames.map((category) => category.name);
  }





useEffect(() => {

    const getData = async () => {
      const eventData = await fetchEvent(eventId);
      const categoriesData = await fetchCategories();
      const userData = await fetchUser(eventData.createdBy);
      setEvent(eventData);
      setCategories(categoriesData);
      setCreatedBy(userData);
    }
    getData();
}
, [eventId]);

const handleEditEvent = async (updatedEvent) => {
  try{
    await updateEvent(eventId, updatedEvent);
    setEvent(updatedEvent);
    toast({title: 'Event updated', status: 'success'});
    setIsEditModalOpen(false);
   
  }catch(error){
    toast({title: 'Failed to update event', status: 'error'});
  }
}

const handleDeleteEvent = async () => {
 const confirm=window.confirm('Are you sure you want to delete this event?');
  if(confirm){
    try{
      await deleteEvent(eventId);
      toast({title: 'Event deleted', status: 'success'});
      navigate('/');
    }catch(error){
      toast({title: 'Failed to delete event', status: 'error'});
    }
  }
}


if(!event) {
  return <Spinner />;
}


  return (
    <Box p="4">
      
       
          <Image width="100%" height="300px" objectFit="cover" src={event.image} alt={event.name} />
          <Box mt="4">
            <Text fontSize="2*l" fontWeight="semibold">{event.title}</Text>
            <Text>{event.description}</Text>
            <Text mt="2">Start:{new Date(event.startTime).toLocaleString()}</Text>
            <Text mt="2">End:{new Date(event.endTime).toLocaleString()}</Text>
            <Text mt="2">Categories:{getCategoryNames(event.categoryIds).join(', ')}</Text>
            {
              createdBy && (
                <Text mt="2">Created by: {createdBy.name}</Text>
              )
            }
            <Button mt="2" colorScheme="blue" onClick={()=>setIsEditModalOpen(true)}>Edit</Button>
            <Button ml="2" mt="2" colorScheme="red" onClick={handleDeleteEvent}>Delete</Button>
            {
              isEditModalOpen && (
                <EditEventModal
                  event={event}
                  categories={categories}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleEditEvent}
                />
              )
            }      
          </Box>
        </Box>
   
  )
};
