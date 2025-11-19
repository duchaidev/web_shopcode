import getInstanceAxios from "./AxiosClient";

const baseDomain = import.meta.env.VITE_PUBLIC_API;
const baseURL = `${baseDomain}`;

export default getInstanceAxios(baseURL);
