import { axiosInstance } from '@/shared/api/axiosInstance'
import { IRow } from '@/entities/Project/model/interfaces/row'

export const deleteRow = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_ID}/row/${id}/delete`
        )

        return data
    } catch (error) {
        console.error(`Row deleting error: ${error}`)
    }
}
