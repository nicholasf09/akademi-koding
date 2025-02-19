// chapter.service.js
import axios from 'axios';
import getCookies from '../hooks/getCookies.js';

export const getChaptersByModule = async (moduleId) => {
  const token = getCookies('token');
  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.get(`${API_ENDPOINT}/modules/${moduleId}/chapters`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log("API Response:", response.data); // Log raw response
    return response.data;
  } catch (err) {
    console.error("Error fetching chapters:", err);
    throw err;
  }
};

export const getuserChaptersByModule = async (moduleId, userId) => {
  const token = getCookies('token');
  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.post(`${API_ENDPOINT}/modules/${moduleId}/user-chapters`, { userId, moduleId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("API Response:", response.data); // Log raw response
    return response.data;
  } catch (err) {
    console.error("Error fetching chapters:", err);
    throw err;
  }
};

export const addChapter = async (chapterData, module_id) => {
  const token = getCookies('token');

  // Tambahkan module_id ke chapterData
  chapterData.module_id = module_id;

  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.post(`${API_ENDPOINT}/add/chapter`, chapterData, {
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
export const updateChapter = (chapterData, module_id, callback) => {
  const token = getCookies("token");

  // Gabungkan chapterData dengan module_id
  const dataToSend = {
    ...chapterData,
    module_id,
  };

  // console.log("Data to send:", dataToSend);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  axios.post(`${API_ENDPOINT}/update/chapter`, dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`, // Token untuk otentikasi
    }
  })
    .then((res) => {
      // Jika berhasil, panggil callback dengan data respons
      callback(res.data);
    })
    .catch((err) => {
      // Tangani error
      console.error("Error updating chapter:", err);
    });
};

export const markChapterAsComplete = async (userId, chapterId) => {
  const token = getCookies('token');
  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.post(
      `${API_ENDPOINT}/user-chapter`,
      { userId, chapterId, status: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error marking chapter as complete:", err);
    throw err;
  }
};
