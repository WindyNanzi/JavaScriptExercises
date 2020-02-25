import React, { useState } from 'react';
import { Button } from 'antd'
import './App.css'
import { request }  from './request'

const App = () => {

  const SIZE = 1 * 1024 * 1024 

  interface chunkData{
    chunk: Blob,
    hash: string
  }

  const [file,setFile] = useState<File | null>(null)
  const [data,setData] = useState<Array<chunkData>>([])

  /**
   * 生成文件切片
   * @param file 文件
   * @param size 分片大小
   */
  function createFileChunk(file: File, size = SIZE){
    const fileChunkList = []
    let cur = 0
    while(cur < file.size){
      fileChunkList.push({file: file.slice(cur, cur+size)})
      cur += size
    }
    return fileChunkList
  }

  async function uploadChunks(){
    const requestList = data.map(({chunk, hash})=>{
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', file!.name)
      return { formData }
    }).map(({ formData }) => {
      request({
        url: 'http://localhost:3030',
        data: formData
      })
    })

    await Promise.all(requestList) //并发切片
    await mergeRequest() //服务端还需要合并切片
  }

  function handleFileChange(e: (React.ChangeEvent<HTMLInputElement> & HTMLInputElement)){
    const file = e.target.files![0]
    if(!file) return
    setFile(file)
    const fileChunkList = createFileChunk(file)
    setData(fileChunkList.map(({file:chunk},index)=>({
      chunk: chunk,
      hash: `${file.name}-${index}`
    })))
  } 

  async function handleUpload(e:React.MouseEvent<HTMLElement, MouseEvent>){
    if(!file) return
    await uploadChunks()
  }

  async function mergeRequest(){
    await request({
      url: 'http://localhost:3030/merge',
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({filename: file?.name, size: SIZE})
    })
  }

  return (
    <div className="App">
      <div className="Content">
        <input type='file' onChange = { handleFileChange } />
        <Button type='primary' onClick = { handleUpload }>上传</Button>
      </div>
    </div>
  );
}

export default App;
