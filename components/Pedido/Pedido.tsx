import { useMutation } from '@apollo/client'
import { Button, HStack, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { ACTUALIZAR_PEDIDO, ELIMINAR_PEDIDO, OBTENER_PEDIDOS } from 'services'
import Swal from 'sweetalert2'

export default function Pedido({ pedido }: any) {
  const router = useRouter()
  const {
    id,
    total,
    cliente: { nombre, apellido, telefono, email },
    estado,
    articulos,
  } = pedido

  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO)
  const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
    update(cache) {
      // obtener productos
      const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS })!
      // reescribir el cache (para actualizar el array de productos)
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(
            (producto: any) => producto.id !== id
          ),
        },
      })
    },
  })

  const [estadoPedido, setEstadoPedido] = useState(estado)
  const [clase, setClase] = useState('')
  // Función que modifica el color del pedido de acuerdo a su estado
  const clasePedido = useCallback(() => {
    if (estadoPedido === 'PENDIENTE') {
      setClase('border-yellow-500')
    } else if (estadoPedido === 'COMPLETADO') {
      setClase('border-green-500')
    } else {
      setClase('border-red-800')
    }
  }, [estadoPedido])

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido)
    }
    clasePedido()
  }, [estadoPedido, clasePedido])

  const cambiarEstadoPedido = async (nuevoEstado: any) => {
    try {
      const { data } = await actualizarPedido({
        variables: {
          actualizarPedidoId: id,
          data: {
            estado: nuevoEstado,
            clienteId: pedido.cliente.id,
          },
        },
      })

      console.log(data)

      setEstadoPedido(data.actualizarPedido.estado)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEliminarPedido = (id: number) => {
    Swal.fire({
      title: '¿Deseas eliminar este pedido ?',
      text: 'Esta accion no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarPedido({
            variables: { eliminarPedidoId: id },
          })

          Swal.fire('Eliminado!', data.eliminarPedido, 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const handleEditar = (id: number) => {
    router.push(`/editar-pedido/${id}`)
  }

  return (
    <div
      className={` ${clase} border-t-8 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {nombre} {apellido}{' '}
        </p>

        {email && <p className=" text-gray-800 flex items-center my-2">{email}</p>}

        {telefono && <p className=" text-gray-800 flex items-center my-2">{telefono}</p>}

        <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
          value={estadoPedido}
          onChange={(e) => cambiarEstadoPedido(e.target.value)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>

      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
        {articulos.map((articulo: any) => (
          <div key={articulo.id} className="mt-4">
            <p className="text-sm text-gray-600">Producto: {articulo.nombre} </p>
            <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad} </p>
          </div>
        ))}

        <p className="text-gray-800 mt-3 font-bold ">
          Total a pagar:
          <span className="font-light"> $ {total}</span>
        </p>

        <button
          className="uppercase text-xs font-bold  flex items-center mt-4 bg-red-800 px-5 py-2  text-white rounded leading-tight"
          onClick={() => handleEliminarPedido(id)}
        >
          Eliminar Pedido
        </button>
      </div>
    </div>
  )
}
