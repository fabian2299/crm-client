import Pedido from '@/components/Pedido/Pedido'
import { useQuery } from '@apollo/client'
import { Box, Button, Center, Heading, Spinner, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { OBTENER_PEDIDOS } from 'services'

export default function Pedidos() {
  const { data, loading } = useQuery(OBTENER_PEDIDOS)

  const tableData = (data: any, loading: any) => {
    if (loading)
      return (
        <Center mt="10">
          <Spinner />
        </Center>
      )
    return data.obtenerPedidosVendedor.map((pedido: any) => (
      <Pedido key={pedido.id} pedido={pedido} />
    ))
  }

  return (
    <div>
      <Heading>Pedidos</Heading>

      <Link href="/nuevo-pedido" passHref>
        <Button colorScheme="blue" mt="8">
          Nuevo Pedido
        </Button>
      </Link>

      {data?.obtenerPedidosVendedor.length > 0 ? (
        tableData(data, loading)
      ) : (
        <Box mt="10">
          <Heading>No hay pedidos aun</Heading>
        </Box>
      )}
    </div>
  )
}
