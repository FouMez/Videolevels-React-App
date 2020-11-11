import axios from "axios";

const API_PHOTOS: string =
  "https://qv4ptgbffh.execute-api.eu-central-1.amazonaws.com/prod";

const addImages = async (userId: string, images: Blob) => {
  const data = new FormData();
  data.append("files", images);
  const res = await axios.post(`${API_PHOTOS}/upload?userid=${userId}`, data, {
    headers: { "content-type": "multipart/form-data" },
  });
  return res.data;
};

const loadImage = async (userId: string, filename: string) => {
  try {
    const res = await axios.get(
      `${API_PHOTOS}/r?userid=${userId}&filename=${filename}`,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.log("error", { err });
  }
  return "";
};

export { addImages, loadImage };
