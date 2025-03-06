import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchRows = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_ID}/row/list`
        )

        return data
    } catch (error) {
        console.error(`Rows fetching error: ${error}`)
    }
}
