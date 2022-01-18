import { Button, Text } from '@chakra-ui/react'

export default function ServerErrorPage({ statusCode = 500 }: { statusCode: number }) {
  return (
    <div className="text-center">
      <Text>🍄 somethingWentWrong</Text>

      <Text>errorMessage</Text>

      <Text>
        <span className="bg-gray-300 inline-block">ERRORCODE: {statusCode}</span>
      </Text>

      <Button as="a" href="/">
        goHome
      </Button>
    </div>
  )
}
