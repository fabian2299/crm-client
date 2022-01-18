import { Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Header({ usuario }: any) {
  const router = useRouter()
  const { nombre, apellido } = usuario

  const handleLogout = () => {
    localStorage.removeItem('token')
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  return (
    <HStack justify="space-between" spacing="10" mb="3">
      <Text fontWeight="bold" fontSize="xl">
        Hola: {nombre} {apellido}
      </Text>

      <Button onClick={handleLogout} colorScheme="blue" size="sm">
        Cerrar Sesion
      </Button>
    </HStack>
  )
}
