import React, { useState, useEffect } from 'react';
import { Heading, Box, Input, Textarea, Button, Select, useToast } from '@chakra-ui/react';
import { fetchCategories, addEvent } from '../services/eventService';


export const AddEventPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const toast = useToast();



   useEffect(() => {
    const fetchCategoriesData = async () => {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        }
        fetchCategoriesData();
    }, []);

    const handleAddEvent = async () => {
        const newEvent={
            title,
            description,
            image,
            location,
            startTime,
            endTime,
            categoryIds
        };
        try{
            await addEvent(newEvent);
            toast({title: 'Event added succesfully',status: 'success',});
        }catch(error){
            toast({title: 'Failed to add event',status: 'error',});
        }
    }


    return(
        <Box p="4">
            <Heading mb="4">Add Event</Heading>
            <Input placeholder="Title" mb="4" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Description" mb="4" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input placeholder="Image" mb="4" value={image} onChange={(e) => setImage(e.target.value)} />
            <Input placeholder="Location" mb="4" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Input type="datetime-local" placeholder="Start Time" mb="4" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Input type="datetime-local" placeholder="End Time" mb="4" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <Select placeholder="Select Categories" mb="4" multiple={true} value={categoryIds} onChange={(e) => setCategoryIds(Array.from(e.target.value))}>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
            <Button colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
        </Box>
    )
}