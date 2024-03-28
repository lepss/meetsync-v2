import axios from "axios";

export async function uploadImage(imageFile: File) {
  const imageFormData = new FormData();
  imageFormData.append("file", imageFile);
  imageFormData.append("upload_preset", "vp7zprgo");

  interface CloudinaryResponse {
    public_id: string;
    secure_url: string;
  }

  const response = await axios.post<CloudinaryResponse>(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    imageFormData
  );
  return response.data.secure_url;
}
