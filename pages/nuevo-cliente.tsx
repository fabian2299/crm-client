import { useState } from 'react'
import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@apollo/client'

import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { NUEVO_CLIENTE, OBTENER_CLIENTES_USUARIO } from 'services'

export default function NuevoCliente() {
  const router = useRouter()

  const [mensaje, guardarMensaje] = useState('')

  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // obtener el objeto de cache que vamos a actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })!

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: { obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente] },
      })
    },
  })

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      apellido: Yup.string().required('El apellido del cliente es obligatorio'),
      empresa: Yup.string().required('El campo empresa  es obligatorio'),
      email: Yup.string().email('Email no válido').required('El email del cliente es obligatorio'),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, empresa, email, telefono } = valores

      try {
        const { data } = await nuevoCliente({
          variables: {
            data: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        })

        router.push('/') // redireccionar hacia clientes
      } catch (error: any) {
        guardarMensaje(error.message)

        setTimeout(() => {
          guardarMensaje('')
        }, 2000)
      }
    },
  })

  const mostrarMensaje = () => {
    return (
      <div className="bg-black py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <Box>
      <Heading>Nuevo Cliente</Heading>

      <form onSubmit={formik.handleSubmit}>
        <VStack spacing="6" mt="8" bgColor="gray.700" p="10" w="xl" rounded="lg" mx="auto">
          <FormControl>
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="nombre">
              Nombre
            </FormLabel>

            <Input
              id="nombre"
              type="text"
              placeholder="Nombre Cliente"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
          </FormControl>

          {formik.touched.nombre && formik.errors.nombre && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.nombre}</p>
            </div>
          )}

          <FormControl>
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="apellido">
              Apellido
            </FormLabel>

            <Input
              id="apellido"
              type="text"
              placeholder="Apellido Cliente"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apellido}
            />
          </FormControl>

          {formik.touched.apellido && formik.errors.apellido && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.apellido}</p>
            </div>
          )}

          <FormControl>
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="empresa">
              Empresa
            </FormLabel>

            <Input
              id="empresa"
              type="text"
              placeholder="Empresa Cliente"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.empresa}
            />
          </FormControl>

          {formik.touched.empresa && formik.errors.empresa && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.empresa}</p>
            </div>
          )}

          <FormControl>
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="email">
              Email
            </FormLabel>

            <Input
              id="email"
              type="email"
              placeholder="Email Cliente"
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
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="telefono">
              Teléfono
            </FormLabel>

            <Input
              id="telefono"
              type="tel"
              placeholder="Teléfono Cliente"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Registrar Cliente
          </Button>

          {mensaje && mostrarMensaje()}
        </VStack>
      </form>
    </Box>
  )
}
