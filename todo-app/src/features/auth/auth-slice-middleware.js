import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./auth-slice-actions";
import { persistAuth } from "./auth-persister";


export const authStoreMiddleware = createListenerMiddleware();
authStoreMiddleware.startListening({
  matcher: isAnyOf(loginUser, logoutUser),
  effect: (action, listenerApi) => {
        const { auth } = listenerApi.getState();
        persistAuth(auth);
    }
});