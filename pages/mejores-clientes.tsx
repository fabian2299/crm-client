import { useQuery } from '@apollo/client'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { MEJORES_CLIENTES } from 'services'

export default function MejoresClientes() {
  const { data, loading, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES)
  console.log(data)

  useEffect(() => {
    startPolling(1000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  if (loading) return <Spinner />

  const bestBuyers = data.mejoresClientes.map((cliente: any) => {
    const seller = cliente.clienteId
    const total = cliente._sum.total
    return { seller, total }
  })

  console.log(bestBuyers)

  return (
    <Box>
      <Heading>Mejores Vendedores</Heading>

      <BarChart
        width={600}
        height={500}
        data={bestBuyers}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="seller" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </Box>
  )
}
