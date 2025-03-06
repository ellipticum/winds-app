import React, { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import Loader from '@/shared/UI/Loader'

interface Props {
    isLoading: boolean
    children: ReactNode
}

const Loading = ({ isLoading, children }: Props) => {
    return (
        <div className={styles.content}>
            {children}
            <div
                className={classNames(styles.overlay, {
                    [styles.hidden]: !isLoading
                })}
            >
                <Loader />
            </div>
        </div>
    )
}

export default Loading
