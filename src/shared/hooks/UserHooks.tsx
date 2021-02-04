
import { useContext } from "react";
import { LoggedUserContext } from "../context/LoggedUserContext";

function useUser() {
  const userContext = useContext(LoggedUserContext)
  if (userContext == null) {
    throw new Error("No context found for LoggedUser")
  }
  return userContext
}

export {
  useUser
}