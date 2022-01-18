interface initialStateProps {
  cliente: any
  productos: any[]
  total: number
}

export const initialState: initialStateProps = {
  cliente: {},
  productos: [],
  total: 0,
}

type Action =
  | { type: 'seleccionar_cliente'; payload: any }
  | { type: 'seleccionar_producto'; payload: any }
  | { type: 'cantidad_productos'; payload: any }
  | { type: 'total_cantidad'; payload: any }

export function reducer(state: initialStateProps, action: Action) {
  switch (action.type) {
    case 'seleccionar_cliente':
      return {
        ...state,
        cliente: action.payload,
      }
    case 'seleccionar_producto':
      return {
        ...state,
        productos: action.payload,
      }
    case 'cantidad_productos':
      return {
        ...state,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id ? (producto = action.payload) : producto
        ),
      }
    case 'total_cantidad':
      return {
        ...state,
        total: action.payload,
      }
    default:
      return state
  }
}
