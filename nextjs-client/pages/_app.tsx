import '@/styles/globals.css'
const { library, config } = require('@fortawesome/fontawesome-svg-core')
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import React from 'react'
import {fas} from '@fortawesome/free-solid-svg-icons'

const queryClient = new QueryClient()
library.add(fas)

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />  
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
  }
