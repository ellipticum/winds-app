'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Buttons } from '@/shared/UI/Buttons'

const ShareButton = () => {
    const onClick = () => {}

    return <Buttons.Icon icon='share' onClick={onClick} />
}

export default ShareButton
