import { createContext, Dispatch, Reducer, PropsWithChildren, useReducer, useContext } from 'react'
import { initialState, reducer } from './PedidoReducer'

export function createCtx<StateType, ActionType>(
  reducer: Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: Dispatch<ActionType> = () => initialState

  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
  })

  const Provider = (props: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <ctx.Provider value={{ state, dispatch }} {...props} />
  }
  return [ctx, Provider] as const
}

const [ctx, Provider] = createCtx(reducer, initialState)

const PedidoContext = ctx
export const PedidoProvider = Provider

export const usePedidoContext = () => {
  return useContext(PedidoContext)
}
