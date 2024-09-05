import { z } from "zod";


export const imageSchema = z.custom<File>((file : File ) => {
    
    const onlyFile = file;

    // Verifica que el archivo sea una instancia de File
    if (!(onlyFile instanceof File)) {
        return false;
    }
  
    // Verifica el tipo MIME para asegurarte de que sea una imagen
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validMimeTypes.includes(onlyFile.type)) {
      return false;
    }
  
    // Verifica que el tamaño del archivo no sea demasiado grande (ejemplo: 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (onlyFile.size > maxSizeInBytes) {
      return false;
    }

    return true;
  }, {
    message: "Invalid image. Must be one File or JPEG, PNG, WEBP or GIF and less than 5MB."
  }).nullable();


export const tweetSchema = z.object({
    tweet: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).max(100, 'Must not be greater than 100 characters.'),
    image: imageSchema,
    accesibility: z.string()
})