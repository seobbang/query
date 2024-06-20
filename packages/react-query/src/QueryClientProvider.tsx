'use client'
import * as React from 'react'

import type { QueryClient } from '@tanstack/query-core'

export const QueryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
)

// context 가져와서 반환해줌.
export const useQueryClient = (queryClient?: QueryClient) => {
  const client = React.useContext(QueryClientContext)

  if (queryClient) {
    return queryClient
  }

  if (!client) {
    throw new Error('No QueryClient set, use QueryClientProvider to set one')
  }

  return client
}

export type QueryClientProviderProps = {
  client: QueryClient
  children?: React.ReactNode
}

export const QueryClientProvider = ({
  client,
  children,
}: QueryClientProviderProps): React.JSX.Element => {
  React.useEffect(() => {
    client.mount() //  역할 : mountCount++ / unsubscribeFocus ,unsubscribeOnline 함수 정의
    return () => {
      client.unmount() // 역할 : mountcount-- / unsubscribeFocus ,unsubscribeOnline 함수 실행 및 초기화
    }
  }, [client])

  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  )
}
