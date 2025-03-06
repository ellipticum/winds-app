import { ShortRow } from '@/entities/Project/model/types/shortRow'

export const fieldMap: Record<keyof ShortRow, string> = {
    rowName: 'название',
    salary: 'зарплата',
    equipmentCosts: 'стоимость оборудования',
    overheads: 'накладные расходы',
    estimatedProfit: 'сметная прибыль'
}
