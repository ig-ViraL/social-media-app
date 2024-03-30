export const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

let timeout;
export const debounce = (callBack, delay) => {
  clearTimeout(timeout);
  timeout = setTimeout(callBack, delay);
};
