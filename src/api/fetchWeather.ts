export const fetchWeather = async (city: string) => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=kiev&cnt=40&lang=ru&units=metric&appid=151c49c11c29c26bc8c736d4eb0ec0bb`,
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message);
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    return error.message;
  }
};
