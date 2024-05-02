import { loginFailure, loginStart, loginSucess } from "./userRedux";
import {publicRequest} from "../requestMethod";



export const login = async (dispatch, user )=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);

        // EXPIRE DAY
        const expirationTime = Date.now() + 10 * 1000;

        const userDataWithExpiration = { ...res.data, expirationTime };

        // STORE IN LOCALSTORAGE
        localStorage.setItem('user', JSON.stringify(userDataWithExpiration));
        dispatch(loginSucess(userDataWithExpiration))
    } catch (err) {
        dispatch(loginFailure())
    }
}