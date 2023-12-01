import axios from "axios";

type ImageUploadResponse = {
  url: string;
};
export async function uploadImage(file: File | Blob): Promise<string> {
  const formData = new FormData();
  const fileToUpload = file instanceof Blob ? new File([file], "image") : file;
  formData.append("file", fileToUpload);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const response = await axios.post<ImageUploadResponse>(
    import.meta.env.VITE_CLOUDINARY_URL,
    formData,
  );

  return response.data.url;
}
