import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api/api.js';
import {AccessToken,REFRESH_TOKEN} from '../constantants.js';

const ProtectedRoute = ({children}) => {
    const [isAuthoried, setIsAuthorized] = useState(null);
    const token = localStorage.getItem(AccessToken);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!token) {
      return <Navigate to="/login" />;
    }
    try {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        return <Navigate to="/login" />;
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return children;
    } catch (error) {
      return <Navigate to="/login" />;
    }
};
export default ProtectedRoute