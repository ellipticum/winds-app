import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: string
    width?: number
    height?: number
}

const Icon = ({ icon, className, width = 24, height = 24, ...props }: Props) => {
    return (
        <button className={classNames(styles.button, className)} {...props}>
            <Image src={`/images/vector/${icon}.svg`} alt="_" width={width} height={height} />
        </button>
    )
}

export default Icon
