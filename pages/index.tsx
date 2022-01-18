import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import Link from 'next/link'
import { OBTENER_CLIENTES_USUARIO } from 'services'

import { Box, Heading, Spinner, Center, Button } from '@chakra-ui/react'
import ClienteTabla from '@/components/Cliente/ClienteTabla'

const Home: NextPage = () => {
  const { data, loading } = useQuery(OBTENER_CLIENTES_USUARIO)

  const tableData = (data: any, loading: any) => {
    if (loading)
      return (
        <Center mt="10">
          <Spinner />
        </Center>
      )

    return <ClienteTabla clientes={data.obtenerClientesVendedor} />
  }

  return (
    <Box>
      <Heading>Clientes</Heading>

      <Link href="/nuevo-cliente" passHref>
        <Button colorScheme="blue" mt="8">
          Nuevo Cliente
        </Button>
      </Link>

      {tableData(data, loading)}
    </Box>
  )
}

export default Home
