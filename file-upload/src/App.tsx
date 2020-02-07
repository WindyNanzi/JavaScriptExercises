import React, { useState } from 'react';
import { Button } from 'antd'
import './App.css'
import { request }  from './request'

const App = () => {

  const SIZE = 10 * 1024 * 1024 


  const [file,setFile] = useState<File | null>(null)
  const [data,setData] = useState<Array<any>>([])

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
    }).map(async ({ formData }) => {
      request({
        url: 'http://localhost:3000',
        data: formData
      })
    })

    await Promise.all(requestList) //并发切片
  }

  function handleFileChange(e: (React.ChangeEvent<HTMLInputElement> & HTMLInputElement)){
    const file = e.target.files![0]
    if(!file) return
    setFile(file)
  } 

  async function handleUpload(e:React.MouseEvent<HTMLElement, MouseEvent>){
    if(!file) return
    const fileChunkList = createFileChunk(file)
    setData(fileChunkList.map(({file: chunk} ,index) => ({
      chunk: chunk,
      hash: `${file.name}-${index}`
    })))
    await uploadChunks()
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
