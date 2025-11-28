import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constant'
import api from '../../api'

interface JwtPayload {
  exp: number;
}

function ProtectedRoutes({children}: {children : React.ReactNode}){
    const [isAuth , setIsAuth] = useState<boolean | null>(null)

    useEffect (() => {
        auth().catch(() => setIsAuth(false))
    } , [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('api/refresh-token/' , {refresh: refreshToken})
            if(res.status == 200){
                localStorage.setItem(ACCESS_TOKEN , res.data.access)
                setIsAuth(true)
            }
            else{
                setIsAuth(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuth(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuth(false)
            return
        }
        const decoded = jwtDecode<JwtPayload>(token)
        const tokenExpire = decoded.exp
        const now = Date.now() / 1000
        if(tokenExpire <now){
            await refreshToken()
        }
        else{
            setIsAuth(true)
        }
    }

    if(isAuth == null){
        return <div>Loading....</div>
    }

    return isAuth ? children : <Navigate to={'/signin'} />
}

export default ProtectedRoutes;