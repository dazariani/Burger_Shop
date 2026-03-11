import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (imageFile: File) => {
  const buffer = await imageFile.arrayBuffer()

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "Burger_app" }, // Cloudinary will auto-detect file type
        (error, result) => {
          if (error) {
            return reject(new Error("Image upload failed."))
          } else {
            resolve({ secureUrl: result?.secure_url })
          }
        },
      )
      .end(Buffer.from(buffer)) // End the stream with the buffer
    return uploadStream
  })
}
