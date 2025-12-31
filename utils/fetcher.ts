import axios from "axios";
import { developmentURL, productionURL } from "../constants/URL";

export const fetcher = async (url: string): Promise<Response> => {
  let fullUrl = "/api" + url;

  // if (process.env.NODE_ENV === "development") {
  //   fullUrl = `${developmentURL}/api${url}`;
  // } else {
  //   fullUrl = `${productionURL}/api${url}`;
  // }

  const result = await axios.get(fullUrl, { withCredentials: true });
  return result.data;
};
