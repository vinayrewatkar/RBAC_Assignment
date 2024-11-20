// /utils/apiUtils.ts

import axios from 'axios';

// Helper function to get data from an API
export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

// Helper function to post data to an API
export const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data: ", error);
    throw error;
  }
};
