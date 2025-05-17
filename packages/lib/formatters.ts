export const formatPhone = (phone?: string) => {
  if (!phone) return "";
  return `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
};
