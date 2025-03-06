import React from 'react'
import { IButtonProps } from '@/shared/interfaces/buttonProps'
import styles from './styles.module.scss'
import { Buttons } from '..'
import classNames from 'classnames'

interface Props extends IButtonProps {
    isRotated: boolean
}

const Expand = ({ isRotated, ...props }: Props) => {
    return (
        <Buttons.Icon
            className={classNames({ [styles.rotated]: isRotated })}
            icon="expand"
            {...props}
        />
    )
}

export default Expand
