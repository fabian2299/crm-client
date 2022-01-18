import { useRouter } from 'next/router'
import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useMutation, gql } from '@apollo/client'

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
import { NUEVA_CUENTA } from 'services'

export default function NuevaCuenta() {
  const router = useRouter()
  const [mensaje, guardarMensaje] = useState('')

  const [nuevoUsuario] = useMutation(NUEVA_CUENTA)

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El Nombre es Obligatorio'),
      apellido: Yup.string().required('El Apellido es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string()
        .required('El password no puede ir vacio')
        .min(6, 'El password debe ser de al menos 6 caracteres'),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, email, password } = valores

      try {
        const { data } = await nuevoUsuario({
          variables: {
            data: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        })

        guardarMensaje(`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre} `)

        setTimeout(() => {
          guardarMensaje('')
          router.push('/login')
        }, 3000)
      } catch (error: any) {
        guardarMensaje(error.message)

        setTimeout(() => {
          guardarMensaje('')
        }, 3000)
      }
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
      <Heading align="center">Nueva Cuenta</Heading>

      <form onSubmit={formik.handleSubmit}>
        <VStack alignItems="start" spacing="6" mt="8" bgColor="gray.700" p="10" w="xl" rounded="lg">
          <FormControl>
            <FormLabel htmlFor="nombre" fontSize="xl" fontWeight={'bold'}>
              Nombre
            </FormLabel>
            <Input
              id="nombre"
              type="text"
              placeholder="Nombre Usuario"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          {formik.touched.nombre && formik.errors.nombre && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.nombre}</p>
            </div>
          )}

          <FormControl>
            <FormLabel htmlFor="apellido" fontSize="xl" fontWeight={'bold'}>
              Apellido
            </FormLabel>
            <Input
              id="apellido"
              type="text"
              placeholder="Apellido Usuario"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          {formik.touched.apellido && formik.errors.apellido && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.apellido}</p>
            </div>
          )}

          <FormControl>
            <FormLabel htmlFor="email" fontSize="xl" fontWeight={'bold'}>
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="example@correo.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          {formik.touched.password && formik.errors.password && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.password}</p>
            </div>
          )}

          <Button type="submit" colorScheme="blue" w="full">
            Crear Cuenta
          </Button>

          {mensaje && mostrarMensaje()}
        </VStack>
      </form>
    </Box>
  )
}
