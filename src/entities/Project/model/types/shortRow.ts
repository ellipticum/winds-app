import { IRow } from '@/entities/Project/model/interfaces/row'

export type ShortRow = Pick<
    IRow,
    'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'
>
