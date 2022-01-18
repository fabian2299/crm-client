import { useRouter } from 'next/router'
import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { gql, useMutation } from '@apollo/client'

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AUTENTICAR_USUARIO } from 'services'

export default function Login() {
  const router = useRouter()
  const [mensaje, guardarMensaje] = useState('')

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email no puede ir vacio'),
      password: Yup.string().required('El password es obligatorio'),
    }),
    onSubmit: async (valores) => {
      const { email, password } = valores
      guardarMensaje('Autenticando...')

      try {
        const { data } = await autenticarUsuario({
          variables: {
            data: {
              email,
              password,
            },
          },
        })

        const setToken = async () => {
          const { token } = data.autenticarUsuario
          localStorage.setItem('token', token)
        }

        await setToken()

        setTimeout(() => {
          router.push('/')
        }, 3000)
      } catch (error: any) {
        guardarMensaje(error.message)
      }
      setTimeout(() => {
        guardarMensaje('')
      }, 3000)
    },
  })

  const mostrarMensaje = () => {
    return (
      <Center w="full">
        <Text maxW="md" bgColor="gray" p="2" rounded="lg">
          {mensaje}
        </Text>
      </Center>
    )
  }

  return (
    <Box>
      <Heading align="center">Login</Heading>

      <form onSubmit={formik.handleSubmit}>
        <VStack alignItems="start" spacing="6" mt="8" bgColor="gray.700" p="10" w="xl" rounded="lg">
          <FormControl>
            <FormLabel htmlFor="email" fontSize="xl" fontWeight={'bold'}>
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="example@correo.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </FormControl>

          {formik.touched.email && formik.errors.email && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.email}</p>
            </div>
          )}

          <FormControl>
            <FormLabel htmlFor="password" fontSize="xl" fontWeight={'bold'}>
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="******"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </FormControl>

          {formik.touched.password && formik.errors.password && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.password}</p>
            </div>
          )}

          <Button type="submit" colorScheme="blue" w="full">
            Iniciar Sesion
          </Button>

          {mensaje && mostrarMensaje()}
        </VStack>
      </form>
    </Box>
  )
}
