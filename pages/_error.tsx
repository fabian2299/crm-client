import { Button, Text } from '@chakra-ui/react'
import { NextPage, GetServerSideProps } from 'next'
import NotFoundPage from './404'
import ServerErrorPage from './500'

type ErrorPageProps = {
  statusCode?: number
  message?: string
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const statusCode = res ? res.statusCode : 404

  return {
    props: {
      statusCode,
    },
  }
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  if (statusCode === 404) {
    return <NotFoundPage />
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerErrorPage statusCode={statusCode} />
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode ? 'serverError' : 'clientError'
  }

  return (
    <div className="text-center">
      <Text>🦦 Doh!</Text>

      <Text>{errorMessage}</Text>

      {!statusCode ? null : (
        <Text>
          <span className="bg-gray-300 inline-block">ERRORCODE: {statusCode}</span>
        </Text>
      )}

      <Button as="a" color="primary" href="/">
        goHome
      </Button>
    </div>
  )
}

export default ErrorPage
