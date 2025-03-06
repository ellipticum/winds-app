import React from 'react'
import styles from './styles.module.scss'
import Header from '@/widgets/Header/UI'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import Sidebar from '@/widgets/Sidebar/UI'
import ProjectsProvider from '@/app/providers/ProjectsProvider'
import DataProvider from '@/app/providers/DataProvider'
import Notification from '@/shared/UI/Notification'

interface Props extends ILayoutProps {}

const Wrapper = ({ children }: Props) => {
    return (
        <DataProvider>
            <ProjectsProvider>
                <div className={styles.wrapper}>
                    <Header />
                    <div className={styles.content}>
                        <Sidebar />
                        <main className={styles.main}>{children}</main>
                    </div>
                </div>
                <Notification />
            </ProjectsProvider>
        </DataProvider>
    )
}

export default Wrapper
