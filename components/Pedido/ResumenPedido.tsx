import { useQuery } from '@apollo/client'
import { Box, Text } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { OBTENER_PRODUCTOS } from 'services'
import ProductoResumen from './ProductoResumen'

export default function ResumenPedido() {
  const {
    state: { productos },
    dispatch,
  } = usePedidoContext()

  return (
    <Box>
      <Text>3- Ajusta las cantidades del producto</Text>

      {productos.length > 0 ? (
        <>
          {productos.map((producto) => (
            <ProductoResumen key={producto.id} producto={producto} />
          ))}
        </>
      ) : (
        <>
          <p>no hay</p>
        </>
      )}
    </Box>
  )
}
