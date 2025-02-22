/* eslint-disable react/prop-types */
import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "./AuthProvider"


export const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading) {
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(user) {
        return children
    }
    return <Navigate to="/login" state={location.pathname} replace/>
}
