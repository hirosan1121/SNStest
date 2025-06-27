import {createContext, useReducer} from"react";
import AuthReducer from "./AuthReducer"
import { useEffect } from "react";

//最初のユーザー状態を定義
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user:{
    //     _id: "6809d9ba42f6a29a93e53382",
    //     username: "hirocode",
    //     email: "hirocode@gmail.com",
    //     password: "abcdef",
    //     profilePicture: "/person/1.jpeg",
    //     coverPicture: "",
    //     followers: [],
    //     followings: [],
    //     isAdmin: false,
    // },
    isFetching: false,
    error: false,
}

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    },[state.user])

    return(
        <AuthContext.Provider value ={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}