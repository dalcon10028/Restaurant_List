import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  timeout: 15000,
  headers: {
    "X-Naver-Client-Id": process.env.VUE_APP_CLIENT,
    "X-Naver-Client-Secret": process.env.VUE_APP_SECRET,
  },
});

const fetchLocalList = (keyword: string): Promise<AxiosResponse> => {
  return instance.get("/v1/search/local.json", {
    params: {
      query: keyword,
      display: 4,
    },
  });
};

const fetchImageList = (keyword: string): Promise<AxiosResponse> => {
  return instance.get("/v1/search/image", {
    params: {
      query: keyword,
      display: 4,
    },
  });
};

export { fetchLocalList, fetchImageList };
