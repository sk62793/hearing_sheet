const googleApis = 'https://storage.googleapis.com/'
const storage = 'storage/v1/b/'
const bucketName = 'hearing_sheet_photographs'

// ↓末尾に ${id}${index} を追加して使用
export const uploadGCS = `${googleApis}upload/${storage}${bucketName}/o?name=`

// ↓末尾に ${id}${index} を追加して使用
export const deleteGCS = `${googleApis}${storage}${bucketName}/o/`

// ↓末尾に ${id}${index} を追加して使用
export const filePath = `https://storage.cloud.google.com/${bucketName}/`
