import { Table, Tbody, Thead, Tr, Th } from '@chakra-ui/react'
import Producto from './Producto'

export default function ProductoTabla({ productos }: any) {
  return (
    <Table variant="simple" mt="8">
      <Thead>
        <Tr>
          <Th fontSize="md" color="white">
            Nombre
          </Th>
          <Th fontSize="md" color="white">
            Existencia
          </Th>
          <Th fontSize="md" color="white">
            Precio
          </Th>
          <Th fontSize="md" color="white">
            Eliminar/Editar
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {productos.map((producto: any) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </Tbody>
    </Table>
  )
}
