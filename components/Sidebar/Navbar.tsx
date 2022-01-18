import { Box, Heading, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const isActive = (href: string) => router.pathname === href

  return (
    <nav className="mt-10">
      <VStack alignItems={'start'} spacing={6}>
        <Box>
          <Link href="/">
            <a
              className={`${
                isActive('/') ? ' font-bold text-lg underline underline-offset-4' : ''
              }`}
            >
              Clientes
            </a>
          </Link>
        </Box>

        <Box>
          <Link href="/pedidos">
            <a
              className={`${
                isActive('/pedidos') ? ' font-bold text-lg underline underline-offset-4' : ''
              }`}
            >
              Pedidos
            </a>
          </Link>
        </Box>

        <Box>
          <Link href="/productos">
            <a
              className={`${
                isActive('/productos') ? ' font-bold text-lg underline underline-offset-4' : ''
              }`}
            >
              Productos
            </a>
          </Link>
        </Box>

        <Box>
          <Link href="/mejores-vendedores">
            <a
              className={`${
                isActive('/mejores-vendedores')
                  ? ' font-bold text-lg underline underline-offset-4'
                  : ''
              }`}
            >
              Mejores Vendedores
            </a>
          </Link>
        </Box>

        <Box>
          <Link href="/mejores-clientes">
            <a
              className={`${
                isActive('/mejores-clientes')
                  ? ' font-bold text-lg underline underline-offset-4'
                  : ''
              }`}
            >
              Mejores Clientes
            </a>
          </Link>
        </Box>
      </VStack>
    </nav>
  )
}
