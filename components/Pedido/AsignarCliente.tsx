import { useQuery } from '@apollo/client'
import { Box, Text } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import Select from 'react-select'
import { OBTENER_CLIENTES_USUARIO } from 'services'

export default function AsignarCliente() {
  const { state, dispatch } = usePedidoContext()
  const { data, loading } = useQuery(OBTENER_CLIENTES_USUARIO)

  const seleccionarCliente = (cliente: any) => {
    dispatch({ type: 'seleccionar_cliente', payload: cliente })
  }

  if (loading) return null

  const { obtenerClientesVendedor } = data

  return (
    <Box>
      <Text mt="8">1- Asigna un Cliente al pedido</Text>

      <Select
        className="text-black mt-5"
        options={obtenerClientesVendedor}
        onChange={(cliente) => seleccionarCliente(cliente)}
        getOptionValue={(options: any) => options.id}
        getOptionLabel={(options: any) => options.nombre}
        placeholder="Busque o seleccione el Cliente"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </Box>
  )
}
