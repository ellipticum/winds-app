'use client'

import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { fetchRows } from '@/entities/Project/model/api/fetchRows'
import { useProjects } from '@/app/providers/ProjectsProvider'
import Loading from '@/shared/UI/Loading'
import Row from '@/entities/Project/UI/Row'

const ProjectRows = () => {
    const { rows, setRows, isLoading, setIsLoading } = useProjects()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            const data = await fetchRows()

            setIsLoading(false)

            if (!data) return

            setRows(data)
        }

        fetchData()
    }, [])

    return (
        <Loading isLoading={isLoading}>
            <div className={styles.breadcrumbs}>
                <div className={styles.projectName}>Строительно-монтажные работы</div>
            </div>
            <div className={styles.projectRows}>
                <div className={styles.content}>
                    <div className={styles.columns}>
                        <div className={styles.columnName}>Уровень</div>
                        <div className={styles.columnName}>Наименование работ</div>
                        <div className={styles.columnName}>Основная з/п</div>
                        <div className={styles.columnName}>Оборудование</div>
                        <div className={styles.columnName}>Накладные расходы</div>
                        <div className={styles.columnName}>Сметная прибыль</div>
                    </div>
                    <div className={styles.rows}>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                        <Row />
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default ProjectRows
