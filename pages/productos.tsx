import ProductoTabla from '@/components/Producto/ProductoTabla'
import { useQuery } from '@apollo/client'
import { Box, Button, Center, Heading, Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import { OBTENER_PRODUCTOS } from 'services'

export default function Productos() {
  const { data, loading } = useQuery(OBTENER_PRODUCTOS)

  const tableData = (data: any, loading: any) => {
    if (loading)
      return (
        <Center mt="10">
          <Spinner />
        </Center>
      )
    return <ProductoTabla productos={data.obtenerProductos} />
  }

  return (
    <Box>
      <Heading>Productos</Heading>

      <Link href="/nuevo-producto" passHref>
        <Button colorScheme="blue" mt="8">
          Nuevo Producto
        </Button>
      </Link>

      {tableData(data, loading)}
    </Box>
  )
}
