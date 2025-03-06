import { ReactNode } from 'react'
import type { Metadata } from 'next'

import '@/shared/styles/index.scss'

export const metadata: Metadata = {
    title: 'Seven Winds App',
    description: 'Some desc'
}

const RootLayout = ({
    children
}: Readonly<{
    children: ReactNode
}>) => {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
