import { useMutation } from '@apollo/client'
import { Button, HStack, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ELIMINAR_PRODUCTO, OBTENER_PRODUCTOS } from 'services'
import Swal from 'sweetalert2'

export default function Producto({ producto }: any) {
  const router = useRouter()
  const { nombre, existencia, precio, id } = producto

  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      // obtener productos
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })!
      // reescribir el cache (para actualizar el array de productos)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter((producto: any) => producto.id !== id),
        },
      })
    },
  })

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: '¿Deseas eliminar este producto ?',
      text: 'Esta accion no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarProducto({
            variables: { eliminarProductoId: id },
          })

          Swal.fire('Eliminado!', data.eliminarProducto, 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const handleEditar = (id: number) => {
    router.push(`/editar-producto/${id}`)
  }

  return (
    <Tr>
      <Td>{nombre}</Td>
      <Td>{existencia}</Td>
      <Td>{precio}</Td>
      <Td>
        <HStack spacing="6">
          <Button size="sm" colorScheme="red" onClick={() => handleEliminar(id)}>
            Eliminar
          </Button>
          <Button size="sm" colorScheme="yellow" onClick={() => handleEditar(id)}>
            Editar
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
