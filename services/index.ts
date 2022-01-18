import { gql } from '@apollo/client'

export const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`

export const NUEVO_CLIENTE = gql`
  mutation NuevoCliente($data: ClienteInput!) {
    nuevoCliente(data: $data) {
      nombre
      apellido
      empresa
      email
      telefono
      id
    }
  }
`

export const NUEVA_CUENTA = gql`
  mutation NuevoUsuario($data: UsuarioInput!) {
    nuevoUsuario(data: $data) {
      id
      createdAt
      updatedAt
      nombre
      apellido
      email
      password
    }
  }
`

export const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario($data: AutenticarInput!) {
    autenticarUsuario(data: $data) {
      token
    }
  }
`

export const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      id
      apellido
      email
      nombre
    }
  }
`

export const ELIMINAR_CLIENTE = gql`
  mutation EliminarCliente($eliminarClienteId: Int!) {
    eliminarCliente(id: $eliminarClienteId)
  }
`

export const OBTENER_CLIENTE = gql`
  query ObtenerCliente($obtenerClienteId: Int!) {
    obtenerCliente(id: $obtenerClienteId) {
      id
      telefono
      nombre
      apellido
      empresa
      email
    }
  }
`

export const ACTUALIZAR_CLIENTE = gql`
  mutation ActualizarCliente($actualizarClienteId: Int!, $data: ClienteInput!) {
    actualizarCliente(id: $actualizarClienteId, data: $data) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`
export const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      createdAt
      updatedAt
      nombre
      existencia
      precio
    }
  }
`
export const ELIMINAR_PRODUCTO = gql`
  mutation EliminarProducto($eliminarProductoId: Int!) {
    eliminarProducto(id: $eliminarProductoId)
  }
`

export const NUEVO_PRODUCTO = gql`
  mutation NuevoProducto($data: ProductoInput!) {
    nuevoProducto(data: $data) {
      id
      createdAt
      updatedAt
      nombre
      existencia
      precio
    }
  }
`

export const ACTUALIZAR_PRODUCTO = gql`
  mutation ActualizarProducto($actualizarProductoId: Int!, $data: ProductoInput!) {
    actualizarProducto(id: $actualizarProductoId, data: $data) {
      id
      createdAt
      updatedAt
      nombre
      existencia
      precio
    }
  }
`

export const OBTENER_PRODUCTO = gql`
  query ObtenerProducto($obtenerProductoId: Int!) {
    obtenerProducto(id: $obtenerProductoId) {
      id
      createdAt
      nombre
      updatedAt
      existencia
      precio
    }
  }
`

export const NUEVO_PEDIDO = gql`
  mutation NuevoPedido($data: PedidoInput!) {
    nuevoPedido(data: $data) {
      id
    }
  }
`
export const OBTENER_PEDIDOS = gql`
  query ObtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      total
      estado
      cliente {
        nombre
        apellido
        telefono
        email
      }
      articulos {
        cantidad
        id
        nombre
        precio
      }
    }
  }
`

export const ELIMINAR_PEDIDO = gql`
  mutation EliminarPedido($eliminarPedidoId: Int!) {
    eliminarPedido(id: $eliminarPedidoId)
  }
`

export const ACTUALIZAR_PEDIDO = gql`
  mutation ActualizarPedido($actualizarPedidoId: Int!, $data: PedidoInput!) {
    actualizarPedido(id: $actualizarPedidoId, data: $data) {
      id
      estado
    }
  }
`

export const MEJORES_VENDEDORES = gql`
  query MejoresVendedores {
    mejoresVendedores {
      vendedorId
      _sum {
        total
      }
    }
  }
`

export const MEJORES_CLIENTES = gql`
  query MejoresClientes {
    mejoresClientes {
      clienteId
      _sum {
        total
      }
    }
  }
`
