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

export const getSelectionType = (selection) => {
    let types = []
    if (!selection) {
      return null
    }
    if (selection.locked) {
      return ["Locked"]
    }
  
    if (selection.type === "group" || selection.type === "activeSelection") {
      return ["Multiple"]
    }
  
    if (selection._objects) {
      if (selection.type !== "StaticVector") {
        for (const object of selection._objects) {
          types.push(object.type)
        }
      } else {
        types.push(selection.type)
      }
    } else {
      types.push(selection.type)
    }
  
    return types
  }
  
export const convertQuestionStatus = (status) => {
    if(status === "WAITING")
        return "대기";
    else
        return "완료"
}

export const resizedataURL = (imgTag, canvasTag, datas, wantedWidth, wantedHeight) => {
  return new Promise(async function(resolve, reject){
    imgTag.onload = () =>
      {        
          const ctx = canvasTag.getContext('2d');

          canvasTag.width = wantedWidth;
          canvasTag.height = wantedHeight;

          ctx.drawImage(imgTag, 0, 0, wantedWidth, wantedHeight);

          const dataURI = canvasTag.toDataURL();

          resolve(dataURI);
      };

      imgTag.src = datas;
  });
}