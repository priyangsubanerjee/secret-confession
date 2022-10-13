import { v4 as uuidv4 } from "uuid";

const checkUserId = () => {
  const userId = localStorage.getItem("secret-link-user-id") || null;
  if (userId == null) {
    userId = uuidv4();
    localStorage.setItem("secret-link-user-id", userId);
  }
  return userId;
};

export default checkUserId;
