// const { CLOUD_NAME, PRESET_FILE } = process.env;

export async function postImageToCloudinary(e) {
  try {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "lvd0mmkm");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dtsc0hcla/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const userImage = await res.json();
    const image = userImage.secure_url;

    return image;
  } catch (error) {
    return undefined;
  }
}
