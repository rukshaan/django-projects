import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api/api.js';
import {ACCESS_TOKEN,REFRESH_TOKEN} from '../constants.js';
import { useState,useEffect } from 'react';

// const ProtectedRoute = ({children}) => {
//     const [isAuthoried, setIsAuthorized] = useState(null);
//     const token = localStorage.getItem(AccessToken);
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     if (!token) {
//       return <Navigate to="/login" />;
//     }
//     try {
//       const decodedToken = jwtDecode(token);
//       const isTokenExpired = decodedToken.exp * 1000 < Date.now();
//       if (isTokenExpired) {
//         return <Navigate to="/login" />;
//       }
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       return children;
//     } catch (error) {
//       return <Navigate to="/login" />;
//     }
// };
// export default ProtectedRoute

function ProtectedRoute({children}){
    const [isAuthoried,setIsAuthorized] =useState(null);
    const refreshToken= async () =>{
      const refreshToken =localStorage.getItem(REFRESH_TOKEN)
      try{
        const res=await api.post("/api/token/refresh",{
          refresh:REFRESH_TOKEN
        });
        if(res.status === 200){
          localStorage.setItem(ACCESS_TOKEN,res.data.access)
          setIsAuthorized(true)
        }else{
          setIsAuthorized(false)
        }
      }catch(error){
        console.log(error);
        setIsAuthorized(false)
      }
    }

    const auth =async () =>{
      const token = localStorage.getItem(ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!token) {
        setIsAuthorized(false)
        return
      }
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        await refreshToken()
      }else{
        setIsAuthorized(true)
      }

    }
}