import { useState } from 'react'
import { useRouter } from 'next/router'

import { useMutation } from '@apollo/client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { NUEVO_PRODUCTO, OBTENER_PRODUCTOS } from 'services'

export default function NuevoProducto() {
  const router = useRouter()
  const [mensaje, guardarMensaje] = useState('')

  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // obtener el objeto de cache que vamos a actualizar
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })!

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: { obtenerProductos: [...obtenerProductos, nuevoProducto] },
      })
    },
  })

  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: '',
      precio: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del producto es obligatorio'),
      existencia: Yup.number()
        .required('Agrega la cantidad disponible')
        .positive('No se aceptan números negativos')
        .integer('La existencia deben ser números enteros'),
      precio: Yup.number()
        .required('El precio es obligatorio')
        .positive('No se aceptan números negativos'),
    }),
    onSubmit: async (valores) => {
      const { nombre, existencia, precio } = valores

      try {
        const { data } = await nuevoProducto({
          variables: {
            data: {
              nombre,
              existencia,
              precio,
            },
          },
        })

        router.push('/productos') // redireccionar hacia clientes
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
      <Heading>Crear Nuevo Producto</Heading>

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
            <FormLabel fontSize="xl" fontWeight={'bold'} htmlFor="existencia">
              Existencia
            </FormLabel>

            <Input
              id="existencia"
              type="number"
              placeholder="Apellido Cliente"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.existencia}
            />
          </FormControl>

          {formik.touched.existencia && formik.errors.existencia && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.existencia}</p>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.precio}
            />
          </FormControl>

          {formik.touched.precio && formik.errors.precio && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
              <p className="font-bold">{formik.errors.precio}</p>
            </div>
          )}

          <Button type="submit" colorScheme="blue">
            Nuevo Producto
          </Button>

          {mensaje && mostrarMensaje()}
        </VStack>
      </form>
    </Box>
  )
}
