import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import { useCallback, useEffect } from 'react'

export default function Total() {
  const {
    state: { productos, total },
    dispatch,
  } = usePedidoContext()

  const actualizarTotal = useCallback(() => {
    const cantidadTotal = productos.reduce(
      (total, producto) => (total += producto.precio * producto.cantidad),
      0
    )

    dispatch({ type: 'total_cantidad', payload: +cantidadTotal })
  }, [dispatch, productos])

  useEffect(() => {
    actualizarTotal()
  }, [actualizarTotal])

  return (
    <Box>
      <HStack justify="space-between">
        <Heading fontSize="md">Total a pagar</Heading>
        <Text fontSize="xl" fontWeight={'bold'}>
          ${total}
        </Text>
      </HStack>
    </Box>
  )
}
