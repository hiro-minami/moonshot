export const extractId = (base64: string) => {
  return atob(decodeURIComponent(base64)).split(":")[1];
};
