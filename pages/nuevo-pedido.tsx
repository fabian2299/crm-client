import AsignarCliente from '@/components/Pedido/AsignarCliente'
import AsignarProductos from '@/components/Pedido/AsignarProductos'
import ResumenPedido from '@/components/Pedido/ResumenPedido'
import Total from '@/components/Pedido/Total'
import { useMutation } from '@apollo/client'
import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import { usePedidoContext } from 'context/Pedidos/PedidoContext'
import { useState } from 'react'
import { NUEVO_PEDIDO, OBTENER_PEDIDOS } from 'services'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function NuevoPedido() {
  const router = useRouter()
  const {
    state: { productos, cliente, total },
    dispatch,
  } = usePedidoContext()

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS })!

      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: { obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido] },
      })
    },
  })

  const [mensaje, setMensaje] = useState('')

  const validarPedido = () => {
    return productos.every((producto) => producto.cantidad <= 0) || cliente.id === undefined
  }

  const handleNuevoPedido = async () => {
    const articulos = productos.map((producto) => {
      const cantidad = producto.cantidad
      const id = producto.id
      const precio = producto.precio
      const nombre = producto.nombre

      return { id, cantidad, nombre, precio }
    })

    try {
      const { data } = await nuevoPedido({
        variables: {
          data: {
            total,
            clienteId: cliente.id,
            articulos,
          },
        },
      })

      // Redireccionar
      router.push('/pedidos')

      // Mostrar alerta
      Swal.fire('Correcto', 'El pedido se registró correctamente', 'success')
      console.log(data)
    } catch (error: any) {
      setMensaje(error.message)

      setTimeout(() => {
        setMensaje('')
      }, 3000)
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-black">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <Box>
      <Heading>Crear Nuevo Pedido</Heading>

      <VStack spacing="10" alignItems="stretch" maxW="xl" mx="auto">
        <AsignarCliente />
        <AsignarProductos />
        <ResumenPedido />
        <Total />

        <Button isDisabled={validarPedido()} colorScheme="blue" onClick={handleNuevoPedido}>
          Registrar Pedido
        </Button>

        {mensaje && mostrarMensaje()}
      </VStack>
    </Box>
  )
}
