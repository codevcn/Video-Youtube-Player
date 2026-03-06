import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/HomePage'
import { DevPage } from './dev/DevPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '/dev',
    element: <App />,
    children: [
      {
        index: true,
        element: <DevPage />
      }
    ]
  }
])
