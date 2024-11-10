// chapter.service.js
import axios from 'axios';

export const getChaptersByModule = async (moduleId) => {
  try {
    const response = await axios.get(`http://localhost:3000/modules/${moduleId}/chapters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters by module:", error);
    throw error;
  }
};
