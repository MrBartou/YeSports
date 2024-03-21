import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TeamPage from './pages/TeamPage.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/errors/NotFound.jsx'
import HomePage from './pages/HomePage.jsx'
import PlayerPage from './pages/PlayerPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: '/teams/:teamSlug',
        element: <TeamPage />
      },
      {
        path: '/players',
        element: <PlayerPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
