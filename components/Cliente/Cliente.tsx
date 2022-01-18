import { useMutation } from '@apollo/client'
import { Button, HStack, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ELIMINAR_CLIENTE, OBTENER_CLIENTES_USUARIO } from 'services'
import Swal from 'sweetalert2'

export default function Cliente({ cliente }: any) {
  const router = useRouter()
  const { nombre, apellido, email, empresa, id } = cliente

  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      // obtener clientes
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })!
      // reescribir el cache (para actualizar el array de clientes)
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (cliente: any) => cliente.id !== id
          ),
        },
      })
    },
  })

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: '¿Deseas eliminar a este cliente?',
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
          const { data } = await eliminarCliente({
            variables: { eliminarClienteId: id },
          })

          Swal.fire('Eliminado!', data.eliminarCliente, 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const handleEditar = (id: number) => {
    router.push(`/editar-cliente/${id}`)
  }

  return (
    <Tr>
      <Td>
        {nombre} {apellido}
      </Td>
      <Td>{empresa}</Td>
      <Td>{email}</Td>

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
