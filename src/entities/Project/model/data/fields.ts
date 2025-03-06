import { ShortRow } from '@/entities/Project/model/types/shortRow'

export const fields: { type: 'text' | 'number'; name: keyof ShortRow }[] = [
    {
        type: 'text',
        name: 'rowName'
        // placeholder: 'Статья работы № 2'
    },
    {
        type: 'number',
        name: 'salary'
        // placeholder: '38200'
    },
    {
        type: 'number',
        name: 'equipmentCosts'
        // placeholder: '1200'
    },
    {
        type: 'number',
        name: 'overheads'
        // placeholder: '850'
    },
    {
        type: 'number',
        name: 'estimatedProfit'
        // placeholder: '1020000'
    }
]
