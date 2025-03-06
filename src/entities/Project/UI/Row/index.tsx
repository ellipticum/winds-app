'use client'

import React, {
    useState,
    MouseEvent,
    useCallback,
    KeyboardEvent,
    CSSProperties,
    useRef
} from 'react'
import { IRow } from '@/entities/Project/model/interfaces/row'
import { initialRow } from '@/entities/Project/model/data/initialRow'
import styles from './styles.module.scss'
import Input from '@/shared/UI/Input'
import { Buttons } from '@/shared/UI/Buttons'
import { validateField } from '@/entities/Project/model/helpers/validateField'
import { ShortRow } from '@/entities/Project/model/types/shortRow'
import { createRow } from '@/entities/Project/model/api/createRow'
import { updateRow } from '@/entities/Project/model/api/updateRow'
import { deleteRow } from '@/entities/Project/model/api/deleteRow'
import { useData } from '@/app/providers/DataProvider'
import { fields } from '@/entities/Project/model/data/fields'
import { useProjects } from '@/app/providers/ProjectsProvider'
import classNames from 'classnames'
import Loader from '@/shared/UI/Loader'

const MAX_DEPTH = 3

interface Props {
    row?: IRow
    parentId?: number | null
    level?: number
}

function updateRowInTree(tree: IRow[], updatedRow: IRow): IRow[] {
    return tree.map((r) => {
        if (r.id === updatedRow.id) return updatedRow
        if (r.child && r.child.length > 0) {
            return { ...r, child: updateRowInTree(r.child, updatedRow) }
        }
        return r
    })
}

function addChildInTree(tree: IRow[], parentId: number, child: IRow): IRow[] {
    return tree.map((r) => {
        if (r.id === parentId) {
            return { ...r, child: [...(r.child || []), child] }
        }
        if (r.child && r.child.length > 0) {
            return { ...r, child: addChildInTree(r.child, parentId, child) }
        }
        return r
    })
}

function deleteRowFromTree(tree: IRow[], rowId: number): IRow[] {
    return tree.reduce<IRow[]>((acc, r) => {
        if (r.id === rowId) return acc
        let updated = r
        if (r.child && r.child.length > 0) {
            updated = { ...r, child: deleteRowFromTree(r.child, rowId) }
        }
        acc.push(updated)
        return acc
    }, [])
}

function removeEmptyRowsFromTree(tree: IRow[]): IRow[] {
    return tree
        .filter((r) => Boolean(r.id))
        .map((r) => {
            if (r.child && r.child.length > 0) {
                return { ...r, child: removeEmptyRowsFromTree(r.child) }
            }
            return r
        })
}

const Row = ({ row, parentId = null, level = 1 }: Props) => {
    const { rows, setRows } = useProjects()
    const { setNotificationMessage, setIsNotificationHidden } = useData()

    const debounceTimer = useRef<NodeJS.Timeout | null>(null)

    const isNew = !row || !row.id
    const [isEditable, setIsEditable] = useState<boolean>(isNew)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState<IRow>(row || { ...initialRow, parentId })

    const handleFieldChange = useCallback((field: keyof ShortRow, value: string) => {
        setPayload((prev) => ({ ...prev, [field]: value }))
    }, [])

    const validatePayload = useCallback((): boolean => {
        let hasErrors = false

        for (const item of fields) {
            const key = item.name as keyof ShortRow
            const value = payload[key]
            const validationResult = validateField(key, value)
            if (validationResult) {
                setIsNotificationHidden(false)
                setNotificationMessage(validationResult.message)

                hasErrors = true
            }
        }
        return hasErrors
    }, [payload, setIsNotificationHidden, setNotificationMessage])

    const handleSave = useCallback(async () => {
        if (isLoading || validatePayload()) return

        // 1. Новый ряд
        if (isNew && isEditable) {
            setIsLoading(true)

            const data = await createRow({ payload })

            setIsLoading(false)

            setIsNotificationHidden(false)

            if (!data) {
                setNotificationMessage('Произошла ошибка при создании')
                return
            }
            setNotificationMessage('Ряд успешно создан!')
            setRows((prev) => {
                const cleaned = removeEmptyRowsFromTree(prev)
                if (payload.parentId) {
                    return addChildInTree(cleaned, payload.parentId as number, data.current)
                }
                return [...cleaned, data.current]
            })
            setPayload({ ...initialRow, parentId })
            return
        }

        // 2. Существующий ряд в режиме редактирования
        if (!isNew && isEditable) {
            setIsLoading(true)

            const data = await updateRow({ payload })

            setIsLoading(false)

            setIsNotificationHidden(false)

            if (!data) {
                setNotificationMessage('Произошла ошибка при обновлении')

                return
            }
            setNotificationMessage('Ряд успешно обновлен!')

            setRows((prev) => updateRowInTree(prev, data.current))

            setIsEditable(false)

            return
        }

        // 3. Существующий ряд, не в режиме редактирования
        if (!isNew && !isEditable) {
            if (level >= MAX_DEPTH) {
                setIsNotificationHidden(false)
                setNotificationMessage('Достигнут максимальный уровень вложенности')

                return
            }

            const newChild = { ...initialRow, parentId: row.id! }

            setRows((prev) => {
                const cleaned = removeEmptyRowsFromTree(prev)
                return addChildInTree(cleaned, row.id!, newChild)
            })

            return
        }
    }, [
        isNew,
        isEditable,
        payload,
        parentId,
        row,
        setRows,
        validatePayload,
        setIsNotificationHidden,
        setNotificationMessage
    ])

    const handleDelete = useCallback(async () => {
        if (isNew) {
            return
        }

        setIsLoading(true)

        const data = await deleteRow(row.id!)

        setIsLoading(false)
        setIsNotificationHidden(false)

        if (!data) {
            setNotificationMessage('Произошла ошибка при удалении')

            return
        }

        setNotificationMessage('Ряд успешно удален!')

        setRows((prev) => deleteRowFromTree(prev, row.id!))

        setPayload({ ...initialRow, parentId })
    }, [row, parentId, setNotificationMessage, setIsNotificationHidden, setRows])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault()

                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current)
                }

                debounceTimer.current = setTimeout(() => {
                    handleSave()
                }, 300)
            }
        },
        [handleSave]
    )

    const handleDoubleClick = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation()
            if (!isEditable) {
                setIsEditable(true)
            }
        },
        [isEditable]
    )

    const renderFields = () => {
        return fields.map((field, index) => {
            if (isEditable) {
                return (
                    <Input
                        key={index}
                        {...field}
                        value={payload[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                )
            }
            return (
                <div key={index} className={styles.fieldValue}>
                    {payload[field.name]}
                </div>
            )
        })
    }

    const hasChildren = row && row.child && row.child.length > 0

    return (
        <div
            className={classNames(styles.row, { [styles.editable]: isEditable })}
            onDoubleClick={handleDoubleClick}
        >
            <div className={styles.fields}>
                <div
                    className={styles.level}
                    style={{ '--indent': `${level * 18}px` } as CSSProperties}
                >
                    <div className={styles.controls}>
                        <div className={styles.saveButtonWrapper}>
                            <Buttons.Icon icon="save" width={16} height={16} onClick={handleSave} />
                        </div>
                        {row && (
                            <div className={styles.removeButtonWrapper}>
                                <Buttons.Icon
                                    icon="remove"
                                    width={16}
                                    height={16}
                                    onClick={handleDelete}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {renderFields()}
            </div>

            {hasChildren && (
                <div className={styles.children}>
                    {row.child.map((childRow) => (
                        <Row key={childRow.id} row={childRow} parentId={row.id} level={level + 1} />
                    ))}
                </div>
            )}
            {isLoading && (
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default Row
