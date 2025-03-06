'use client'

import { createContext, Dispatch, useContext, useState } from 'react'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'

interface IDataContext {
    notificationMessage: string
    setNotificationMessage: Dispatch<string>
    isNotificationHidden: boolean
    setIsNotificationHidden: Dispatch<boolean>
}

const DataContext = createContext<IDataContext | null>(null)

export const useData = () => {
    const value = useContext(DataContext)

    if (!value) {
        throw new Error(`${DataContext.displayName} must be inside the provider.`)
    }

    return value
}

interface Props extends ILayoutProps {}

const DataProvider = ({ children }: Props) => {
    const [isNotificationHidden, setIsNotificationHidden] = useState<boolean>(true)
    const [notificationMessage, setNotificationMessage] = useState<string>('')

    return (
        <DataContext.Provider
            value={{
                isNotificationHidden,
                setIsNotificationHidden,
                notificationMessage,
                setNotificationMessage
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
