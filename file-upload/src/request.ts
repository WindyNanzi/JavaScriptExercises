interface keyObject {
  [key:string]: string
}

interface ajaxParams {
  url: string,
  method?: string,
  data?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined,
  headers?: keyObject,
  requestList?: Array<any>
}

export function request (
 { url, method='post', data, headers = {}, requestList }: ajaxParams
) : Promise<any> {
  return new Promise((resolve , reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach( key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = (ev: ProgressEvent) => {
      resolve({
        data: xhr.response
      })
    }
  })
}