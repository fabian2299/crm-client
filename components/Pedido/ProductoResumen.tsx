import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import { useCallback, useEffect, useState } from 'react'

export default function ProductoResumen({ producto }: any) {
  const {
    state: { productos },
    dispatch,
  } = usePedidoContext()
  const { nombre, precio } = producto

  const [cantidad, setCantidad] = useState(0)

  const nuevoProducto = {
    ...producto,
    cantidad,
  }

  const handleCantidad = () => {
    dispatch({ type: 'cantidad_productos', payload: nuevoProducto })
  }

  return (
    <Box mt="5">
      <HStack justify="space-between">
        <VStack alignItems="start">
          <Text>{nombre}</Text>
          <Text>${precio}</Text>
        </VStack>

        <Input
          type="number"
          placeholder="Cantidad"
          maxW="2xs"
          onChange={(e) => setCantidad(+e.target.value)}
        />
        <Button size="sm" colorScheme="blue" onClick={handleCantidad}>
          Elegir cantidad
        </Button>
      </HStack>
    </Box>
  )
}
