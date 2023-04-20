export const generateSlug = (length = 8) => {
    let slug = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charCount = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charCount);
        slug += characters[randomIndex];
    }

    return slug;
}

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
