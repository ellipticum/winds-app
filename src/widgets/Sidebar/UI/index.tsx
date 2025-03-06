'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import { mockProjects } from '@/entities/Project/model/data/mockProjects'
import Image from 'next/image'
import { Buttons } from '@/shared/UI/Buttons'
import classNames from 'classnames'
import { useProjects } from '@/app/providers/ProjectsProvider'

const Sidebar = () => {
    const { project } = useProjects()

    const [areProjectsHidden, setAreProjectsHidden] = useState(false)

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <span className={styles.heading}>Название проекта</span>
                    <span className={styles.description}>Аббревиатура</span>
                </div>
                <Buttons.Expand
                    isRotated={!areProjectsHidden}
                    onClick={() => setAreProjectsHidden((prevState) => !prevState)}
                />
            </div>
            <div className={classNames(styles.projects, { [styles.hidden]: areProjectsHidden })}>
                {mockProjects.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={classNames(styles.project, {
                                [styles.active]: project && project.id === item.id
                            })}
                        >
                            <Image
                                src="/images/vector/project.svg"
                                alt="_"
                                width={24}
                                height={24}
                            />
                            <span className={styles.name}>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}

export default Sidebar
