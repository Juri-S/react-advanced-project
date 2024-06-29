import axios from 'axios';
const API_URL = 'http://localhost:3000';



//FUNCTION TO GET ALL EVENTS

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const fetchEvent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//Add event
export const addEvent = async (event) => {
  try {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//update event
export const updateEvent = async (id, event) => {
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//delete event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}