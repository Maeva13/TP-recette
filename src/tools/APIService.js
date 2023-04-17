import { Directus } from '@directus/sdk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function APIService() {
  const navigate = useNavigate();

  useEffect(() => {
    connect().then(token => {
      if (token && isUserOnPage('')) navigate('/recette')
      else if (token && isUserOnPage('login')) navigate('/recette')
      else if (!token && !isUserOnPage('login')) navigate('/login')
    })
  })

  const connect = () => {
    return new Promise(async (res, rej) => {
      const directus = new Directus('http://localhost:8055')

      // try to refresh old session if token hasn't expired
      try {
        const { access_token } = await directus.auth.refresh();

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('authToken', access_token);

        res(access_token)

      } catch {

        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('authToken', null);

        res(null)

      }
    })
  }

  const isUserOnPage = (pageName) => window.location.pathname === `/${pageName}`

  return;
}