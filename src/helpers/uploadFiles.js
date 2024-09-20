const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`

const uploadFiles = async(file)=>{
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'chat-app')

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })
    
        const resData = await response.json();
    
        return resData;
    } catch (error) {
        console.log('ERROR WHILE UPLOADING PHOTO ON CLOUDINARY', error.message);
    }
}

export default uploadFiles;