import { authService } from '../services/authService';

export default function logout(setUser, setCart, navigate) {
    authService
      .userLogout()
      .then(() => {
        setUser({});
        setCart(null);
        navigate('/')
      })
  }