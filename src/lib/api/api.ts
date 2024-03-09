import md5 from "md5";

const API_PASSWORD = "Valantis";
const API_URL = "http://api.valantis.store:40000/";

//Генерация строки аунтентификации под текущей дате
const generateAuthString = (password: string) => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const xAuth = md5(`${password}_${timestamp}`);

  return xAuth;
};

//Создание запроса
export const makeRequest = async (method: string, data: {}) => {
  const authString = generateAuthString(API_PASSWORD);
  const headers = {
    "Content-Type": "application/json",
    "X-Auth": authString,
  };

  try {
    const response = await fetch(API_URL, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    if (error.status === 400) {
      console.log("Неверный запрос", error);
    }
    if (error.status === 401) {
      console.log("Неверный заголовок", error);
    } else {
      console.log(error);
    }
    return error;
  }
};
