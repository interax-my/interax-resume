export const fileToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const str = reader.result;
        resolve(typeof str === 'string' ? str.replace(/^data:.+;base64,/, '') : str);
    };
    reader.onerror = error => reject(error);
   });
   