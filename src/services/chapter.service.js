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

export const addChapter = async (chapterData, module_id) => {
  const token = getCookies('token');

  // Tambahkan module_id ke chapterData
  chapterData.module_id = module_id;

  try {
    const response = await axios.post("http://localhost:3000/add/chapter", chapterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data; // Mengembalikan data respons langsung
  } catch (err) {
    console.log("Error adding chapter:", err);
    throw err; // Lempar error agar bisa ditangani di bagian pemanggil
  }
};
