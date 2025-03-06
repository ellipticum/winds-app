import React, { ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { IInputHint } from '@/shared/interfaces/inputHint'
import classNames from 'classnames'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    hints?: IInputHint[]
}

const Input = ({ className, hints = [], ...props }: Props) => {
    const isValid = hints.every((hint) => hint.isValid)

    return (
        <div className={classNames(styles.wrapper, { [styles.invalid]: isValid })}>
            <input className={styles.input} {...props}></input>
            {hints.map((hint, index) => {
                return (
                    <div key={index} className={styles.hint}>
                        {hint.value}
                    </div>
                )
            })}
        </div>
    )
}

export default Input
