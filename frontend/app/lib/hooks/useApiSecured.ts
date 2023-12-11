"use client";

import { useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function useApiSecured() {
  let sent = false;

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,

      async (error) => {
        const err = error as AxiosError;
        // @ts-ignore
        const priorReq = err.response.config;
        console.log("refresh ", err.response);

        if (err?.response?.status === 403 && !sent) {
          console.log("inside", sent);
          sent = true;
          await axios("/lib/apiCalls/auth/refresh");

          return axios(priorReq);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axios;
}
