import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./Redux/Store.ts";
import { AuthContextProvider } from './Context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthContextProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>,
)
