export interface filesModel {
    name: string,
    size: number,
    status: string,
    error: string,
    data: File | Blob
}

export const jsonFiles = {
    name: 'name',
    status: 'status',
    error: 'fail',
    file: 'file'
}