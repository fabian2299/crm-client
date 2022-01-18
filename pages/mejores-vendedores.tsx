import { useQuery } from '@apollo/client'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { MEJORES_VENDEDORES } from 'services'

export default function MejoresVendedores() {
  const { data, loading, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)

  useEffect(() => {
    startPolling(1000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  if (loading) return <Spinner />

  const bestSellers = data.mejoresVendedores.map((vendedor: any) => {
    const seller = vendedor.vendedorId
    const total = vendedor._sum.total
    return { seller, total }
  })

  console.log(bestSellers)

  return (
    <Box>
      <Heading>Mejores Vendedores</Heading>

      <BarChart
        width={600}
        height={500}
        data={bestSellers}
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
