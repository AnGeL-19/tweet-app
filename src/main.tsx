import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './app/App.tsx'
import '../app/globals.css'
import { store } from './app/context/store/store.ts'
import { AuthProvider } from './app/context/auth/AuthProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>

          <App />

        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
