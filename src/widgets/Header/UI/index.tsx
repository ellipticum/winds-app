'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import ShareButton from '@/features/ShareButton/UI'
import AppsButton from '@/features/AppsButton/UI'
import { usePathname } from 'next/navigation'
import { tabs } from '@/widgets/Header/model/data/tabs'
import Link from 'next/link'
import classNames from 'classnames'

const Header = () => {
    const pathname = usePathname()

    const [tab, setTab] = useState(tabs.find((tab) => tab.href === pathname))

    if (!tab) {
        return
    }

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <AppsButton />
                    <ShareButton />
                </div>
                <div className={styles.tabs}>
                    {tabs.map((tab, index) => {
                        return (
                            <Link
                                key={index}
                                className={classNames(styles.tab, {
                                    [styles.active]: tab.href === pathname
                                })}
                                href={tab.href}
                            >
                                {tab.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </header>
    )
}

export default Header
