import { useContext } from "react";
import { LoggedUserContext } from "shared/context/LoggedUserContext";

// if implementing a logic such as Logged or Unlogged this hook needs to be tested

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