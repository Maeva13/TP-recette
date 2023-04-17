import { Directus } from '@directus/sdk';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material'

export default function APIService() {
  const navigate = useNavigate();
  const [isLoggedIn, setLogStatus] = useState(false);

  useEffect(() => {
    const { search } = window.location

      if (isUserOnPage('login') && search === "?logout")
        disconnect()
      else
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
        setLogStatus(true);

        res(access_token);

      } catch {

        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('authToken', null);
        setLogStatus(false);

        res(null)

      }
    })
  }

  const disconnect = () => {
    const directus = new Directus('http://localhost:8055');
    directus.auth.logout();

    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('token', null);
    setLogStatus(false);
  }

  const isUserOnPage = (pageName) => window.location.pathname === `/${pageName}`

  return <NavBar isLoggedIn={isLoggedIn}/>
}

function NavBar() {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const navItems = [
    <Link to="/recette"><Button variant="text">Recettes</Button></Link>,
    <Link to="#"><Button variant="text">Autre</Button></Link>,
  ]

  if (isLoggedIn)
    navItems.push(<Link to="/login?logout"><Button variant="outlined">Se déconnecter</Button></Link>)

  return <div className='navBar'>
    { navItems }
  </div>

}