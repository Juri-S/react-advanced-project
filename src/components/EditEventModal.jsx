import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea, Select } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';


export const EditEventModal = ({ event, categories, onClose, onSave }) => {

    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [image, setImage] = useState(event.image);
    const[location, setLocation] = useState(event.location);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);
    const [categoryIds, setCategoryIds] = useState(event.categoryIds);
   
    const handleSave = () => {
        const updatedEvent = {
            ...event,
            title,
            description,
            image,
            location,
            startTime,
            endTime,
            categoryIds
        }
        onSave(updatedEvent);
    }
    
   return (
    <Modal isOpen onClose={onClose}>
        <ModalOverlay />  
        <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mb="4"
                />
                <Textarea
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                mb="4"
                />
                <Input
                placeholder='Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                mb="4"
                />
                <Input
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                mb="4"
                />
                <Input
                placeholder='Start Time'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                mb="4"
                />
                <Input
                placeholder='End Time'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                mb="4"
                />
                <Select
                placeholder='Select Categories'
                value={categoryIds}
                onChange={(e) => setCategoryIds(Array.from(e.target.value))}
                mb="4"
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </Select>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>

    </Modal>
        )
}
    
