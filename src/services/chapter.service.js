// chapter.service.js
import axios from 'axios';
import getCookies from '../hooks/getCookies.js'; 

export const getChaptersByModule = async (moduleId) => {

  const token = getCookies('token');
  

  try {
    const response = await axios.get(`http://localhost:3000/modules/${moduleId}/chapters`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters by module:", error);
    throw error;
  }
};

