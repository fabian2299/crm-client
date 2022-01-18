import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ACTUALIZAR_PRODUCTO, OBTENER_PRODUCTO } from 'services'

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
import Swal from 'sweetalert2'

export default function EditarProducto() {
  const router = useRouter()
  const { id } = router.query
  const [mensaje, guardarMensaje] = useState('')

  const { data, loading } = useQuery(OBTENER_PRODUCTO, {
    variables: { obtenerProductoId: +id! },
  })

  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre del producto es obligatorio'),
    existencia: Yup.number()
      .required('Agrega la cantidad disponible')
      .positive('No se aceptan números negativos')
      .integer('La existencia deben ser números enteros'),
    precio: Yup.number()
      .required('El precio es obligatorio')
      .positive('No se aceptan números negativos'),
  })

  const handleEditarProducto = async (values: any) => {
    const { nombre, existencia, precio } = values
    try {
      await actualizarProducto({
        variables: {
          actualizarProductoId: +id!,
          data: {
            nombre,
            existencia,
            precio,
          },
        },
      })
      Swal.fire('Actualizado', 'El producto se actualizo correctamente', 'success')
      router.push('/productos')
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-black py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white">
        <p>{mensaje}</p>
      </div>
    )
  }

  if (loading) return <Spinner />
  const { obtenerProducto } = data

  return (
    <Box>
      <Heading>Editar Cliente</Heading>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={obtenerProducto}
        onSubmit={(values) => {
          handleEditarProducto(values)
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
                  <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="existencia">
                    Existencia
                  </FormLabel>

                  <Input
                    id="existencia"
                    type="number"
                    placeholder="Apellido Cliente"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.existencia}
                  />
                </FormControl>

                {props.touched.existencia && props.errors.existencia && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.existencia}</p>
                  </div>
                )}

                <FormControl>
                  <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="precio">
                    Precio
                  </FormLabel>

                  <Input
                    id="precio"
                    type="number"
                    placeholder="Empresa Cliente"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.precio}
                  />
                </FormControl>

                {props.touched.precio && props.errors.precio && (
                  <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p className="font-bold">{props.errors.precio}</p>
                  </div>
                )}

                <Button type="submit" colorScheme="blue">
                  Editar Producto
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
