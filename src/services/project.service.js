import axios from 'axios';
import getCookies from '../hooks/getCookies';

export const getProjectDetails = (idModule) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  return axios.get(`${API_ENDPOINT}/projects/${idModule}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error fetching project details:", err);
      throw err; // Lempar error untuk penanganan di tempat lain
    });
};

export const updateProject = (id, comment, score) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  return axios.post(
    `${API_ENDPOINT}/project/update`, // Tetap menggunakan POST
    { id, comment, score }, // Data pembaruan dikirim sebagai body JSON
    {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token autentikasi
        "Content-Type": "application/json", // Set tipe konten ke JSON
      },
    }
  )
    .then((res) => res.data) // Return data dari respons
    .catch((err) => {
      console.error("Error updating project:", err);
      throw err; // Lempar error untuk penanganan lebih lanjut
    });
};

export const submitProject = (idUser, idModule, project) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  return axios.post(
    `${API_ENDPOINT}/project/submit`, // Endpoint untuk submit proyek
    { idUser, idModule, project }, // Data yang dikirim dalam body
    {
      headers: {
        Authorization: `Bearer ${token}`, // Token untuk autentikasi
        "Content-Type": "application/json", // Tipe konten JSON
      },
    }
  )
    .then((res) => res.data) // Return data dari respons
    .catch((err) => {
      console.error("Error submitting project:", err);
      throw err; // Lempar error untuk penanganan lebih lanjut
    });
};




