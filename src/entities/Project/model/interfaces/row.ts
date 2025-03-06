export interface IRow {
    parentId: number | null
    equipmentCosts: number
    estimatedProfit: number
    machineOperatorSalary: number
    mainCosts: number
    materials: number
    mimExploitation: number
    overheads: number
    rowName: string
    salary: number
    supportCosts: number
    child: IRow[]
    id?: number
}
