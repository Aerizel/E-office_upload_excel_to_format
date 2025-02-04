export interface filesModel {
    name: string,
    size: number,
    status: string,
    data: File | Blob
}

export const jsonFiles = {
    name: 'name',
    status: 'status',
    file: 'file'
}