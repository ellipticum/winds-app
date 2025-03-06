import { axiosInstance } from '@/shared/api/axiosInstance'
import { IRow } from '@/entities/Project/model/interfaces/row'

interface Props {
    payload: IRow
}

export const updateRow = async ({ payload }: Props) => {
    try {
        const { id, ...params } = payload

        const { data } = await axiosInstance.post(
            `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_ID}/row/${id}/update`,
            { ...params }
        )

        return data
    } catch (error) {
        console.error(`Row updating error: ${error}`)
    }
}
