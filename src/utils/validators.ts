export const emailValidator = (value: string) => {
  return !!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
};

export const imageValidator = async (url: string) => {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('Content-Type');

    return !!(contentType && contentType.startsWith('image'));
  } catch (error) {
    console.log(error);
    return false;
  }
};
