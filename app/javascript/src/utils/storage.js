const setToLocalStorage = ({ authToken }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

const setUserToLocalStorage = ({ authUserId }) => {
  localStorage.setItem("authUserId", JSON.stringify(authUserId));
};
const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

const deleteFromLocalStorage = () => localStorage.removeItem("authToken");

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
  setUserToLocalStorage,
};
