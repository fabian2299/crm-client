import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'

import { ApolloProvider } from '@apollo/client'
import client from 'config/apollo'

import Layout from '@/components/Layout/Layout'
import { PedidoProvider } from 'context/Pedidos/PedidoContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <PedidoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PedidoProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
