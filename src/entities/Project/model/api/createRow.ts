import { axiosInstance } from '@/shared/api/axiosInstance'
import { IRow } from '@/entities/Project/model/interfaces/row'

interface Props {
    payload: IRow
}

export const createRow = async ({ payload }: Props) => {
    try {
        const { data } = await axiosInstance.post(
            `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_ID}/row/create`,
            payload
        )

        return data
    } catch (error) {
        console.error(`Row creation error: ${error}`)
    }
}
