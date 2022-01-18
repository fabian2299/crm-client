import { useQuery } from '@apollo/client'
import { Box, Text } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import { OBTENER_PRODUCTOS } from 'services'

export default function AsignarProductos() {
  const { state, dispatch } = usePedidoContext()
  const { data, loading } = useQuery(OBTENER_PRODUCTOS)

  const [productos, setProductos] = useState([])

  const agregarProductos = useCallback(
    (productosSeleccionados: any) => {
      let productoCantidad
      productoCantidad = productosSeleccionados.map((producto: any) => {
        const nuevoObjeto = { ...producto, cantidad: producto.cantidad ?? 1 }
        return { ...nuevoObjeto }
      })

      dispatch({ type: 'seleccionar_producto', payload: productoCantidad })
    },
    [dispatch]
  )

  useEffect(() => {
    agregarProductos(productos)
  }, [agregarProductos, productos])

  const seleccionarProductos = (producto: any) => {
    setProductos(producto)
  }

  if (loading) return null

  const { obtenerProductos } = data

  return (
    <Box>
      <Text>2- Selecciona uno o mas productos</Text>

      <Select
        className="text-black mt-5"
        options={obtenerProductos}
        isMulti={true}
        onChange={(opcion) => seleccionarProductos(opcion)}
        getOptionValue={(opciones: any) => opciones.id}
        getOptionLabel={(opciones: any) =>
          `${opciones.nombre} - ${opciones.existencia} Disponibles`
        }
        placeholder="Busque o seleccione el Cliente"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </Box>
  )
}
