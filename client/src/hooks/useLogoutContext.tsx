import { useAuthContext } from "./useAuthContext";

const useLogoutContext = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };
  return logout;
};

export default useLogoutContext;
