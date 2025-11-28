import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const imgData = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return imgData?.data?.data?.url;
};

//? upload image using cloudinary
//? example post endpoint: https://api.cloudinary.com/v1_1/<cloud name>/image/upload

export const imageUploadCloudinary = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_NAME);

  const imgData = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );
  return imgData.data.secure_url;
};
