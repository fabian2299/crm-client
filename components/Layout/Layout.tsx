import type { ReactNode } from 'react'

import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'

import { Box, Center, Grid, GridItem } from '@chakra-ui/react'

import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { OBTENER_USUARIO } from 'services'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const path = router.pathname

  const { data, loading } = useQuery(OBTENER_USUARIO)

  if (loading) return null

  const authPages = path === '/login' || path === '/nueva-cuenta'

  const AuthPages = () => {
    return (
      <Center minH="100vh" bgColor="gray.500">
        {children}
      </Center>
    )
  }

  const MainContent = (data: any) => {
    if (!data.obtenerUsuario) {
      router.push('/login')
      return <></>
    }

    return (
      <Box maxW="container.2xl" overflowX="hidden" mx="auto">
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={3} bgColor="gray.500" p="10" minH="100vh">
            <Sidebar />
          </GridItem>

          <GridItem colSpan={9} bgColor="gray.600" p="10" minH="100vh">
            <Header usuario={data.obtenerUsuario} />
            <Box as="main">{children}</Box>
          </GridItem>
        </Grid>
      </Box>
    )
  }

  return (
    <>
      {authPages && AuthPages()}
      {!authPages && MainContent(data)}
    </>
  )
}
