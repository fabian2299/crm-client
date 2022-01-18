import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { ACTUALIZAR_CLIENTE, OBTENER_CLIENTE } from 'services'

import { Formik } from 'formik'
import * as Yup from 'yup'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function EditarCliente() {
  const router = useRouter()
  const { id } = router.query

  const { data, loading } = useQuery(OBTENER_CLIENTE, {
    variables: { obtenerClienteId: +id! },
  })

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)

  const [mensaje, guardarMensaje] = useState('')

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre del cliente es obligatorio'),
    apellido: Yup.string().required('El apellido del cliente es obligatorio'),
    empresa: Yup.string().required('El campo empresa  es obligatorio'),
    email: Yup.string().email('Email no válido').required('El email del cliente es obligatorio'),
  })

  const mostrarMensaje = () => {
    return (
      <div className="bg-black py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white">
        <p>{mensaje}</p>
      </div>
    )
  }

  if (loading) return <Spinner />
  const { obtenerCliente } = data

  const handleEditarCliente = async (values: any) => {
    const { nombre, apellido, email, empresa, telefono } = values
    try {
      await actualizarCliente({
        variables: {
          actualizarClienteId: +id!,
          data: {
            nombre,
            apellido,
            email,
            empresa,
            telefono,
          },
        },
      })
      Swal.fire('Actualizado', 'El cliente se actualizo correctamente', 'success')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Heading>Editar Cliente</Heading>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={obtenerCliente}
        onSubmit={(values) => {
          handleEditarCliente(values)
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <VStack spacing="6" mt="8" bgColor="gray.700" p="10" w="xl" rounded="lg" mx="auto">
                <FormControl>
                  <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="nombre">
                    Nombre
                  </FormLabel>

                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Nombre Cliente"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.nombre}
                  />
                </FormControl>

                {props.touched.nombre && props.errors.nombre && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.nombre}</p>
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
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.apellido}
                  />
                </FormControl>

                {props.touched.apellido && props.errors.apellido && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.apellido}</p>
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
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.empresa}
                  />
                </FormControl>

                {props.touched.empresa && props.errors.empresa && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.empresa}</p>
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
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                </FormControl>

                {props.touched.email && props.errors.email && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.email}</p>
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
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.telefono}
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue">
                  Editar Cliente
                </Button>

                {mensaje && mostrarMensaje()}
              </VStack>
            </form>
          )
        }}
      </Formik>
    </Box>
  )
}
