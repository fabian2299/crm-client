import { Table, Tbody, Thead, Tr, Th } from '@chakra-ui/react'
import Cliente from './Cliente'

export default function ClienteTabla({ clientes }: any) {
  return (
    <Table variant="simple" mt="8">
      <Thead>
        <Tr>
          <Th fontSize="md" color="white">
            Nombre
          </Th>
          <Th fontSize="md" color="white">
            Empresa
          </Th>
          <Th fontSize="md" color="white">
            Email
          </Th>
          <Th fontSize="md" color="white">
            Eliminar/Editar
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {clientes.map((cliente: any) => (
          <Cliente key={cliente.id} cliente={cliente} />
        ))}
      </Tbody>
    </Table>
  )
}
