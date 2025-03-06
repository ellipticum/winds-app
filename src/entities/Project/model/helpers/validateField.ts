import { fieldMap } from '@/entities/Project/model/data/fieldMap'
import { ShortRow } from '@/entities/Project/model/types/shortRow'

export const validateField = (name: keyof ShortRow, value: string | number) => {
    if (value === undefined || value === null || value === '') {
        return {
            isValid: false,
            message: `Поле "${fieldMap[name]}" пустое или ошибочно.`
        }
    }

    return null
}
