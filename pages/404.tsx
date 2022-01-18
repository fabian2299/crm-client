import { Button, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="grid place-content-center min-h-[60vh] space-y-8">
      <Text>🍂 we are sorry</Text>

      <Text>It looks like you are missing!</Text>

      <Link href="/" passHref>
        <Button as="a">go Home</Button>
      </Link>
    </div>
  )
}
