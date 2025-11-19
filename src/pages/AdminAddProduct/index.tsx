import { Breadcrumb, Button, Form, Spin, UploadFile } from 'antd'
import React, { useState } from 'react'
import AddClassify from './commponents/AddClassify'
import ImageProduct from './commponents/ImageProduct'
import Editor from '@/components/atoms/Editor'
import InfoBasicProduct from './commponents/InfoBasicProduct'
import HandleFetchOneProduct from './handle/HandleFetchOneProduct'
import HandleSubmit from './handle/HandleSubmit'

const AdminAddProduct = () => {
  const [form] = Form.useForm()
  const [formClassify] = Form.useForm()
  const [editorData, setEditorData] = useState('')
  const [file, setFile] = useState<UploadFile[]>([])
  const [fileImage, setFileImage] = useState<UploadFile[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [fileListImage, setFileListImage] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <div className='flex flex-col gap-3'>
      <HandleFetchOneProduct
        form={form}
        formClassify={formClassify}
        setEditorData={setEditorData}
        setFile={setFile}
        setFileImage={setFileImage}
        setFileListImage={setFileListImage}
        setFileList={setFileList}
      />
      <div className='flex flex-col gap-2 p-4 rounded bg-white'>
        <Breadcrumb
          items={[
            {
              title: 'Home'
            },
            {
              title: <a href=''>Application Center</a>
            },
            {
              title: <a href=''>Application List</a>
            },
            {
              title: 'An Application'
            }
          ]}
        />
        <h2 className='font-semibold text-xl'>Thêm sản phẩm</h2>
      </div>
      <Spin spinning={loading}>
        <div className='bg-white p-4 rounded flex flex-col gap-4'>
          <h2 className='font-semibold text-xl text-gray-600'>Thông tin sản phẩm</h2>
          <InfoBasicProduct form={form} />
          <AddClassify form={formClassify} />
          <ImageProduct
            fileList={fileList}
            fileListImage={fileListImage}
            fileImage={fileImage}
            file={file}
            setFileListImage={setFileListImage}
            setFileList={setFileList}
            setFileImage={setFileImage}
            setFile={setFile}
          />
          <div className='grid grid-cols-12 gap-2'>
            <span className='col-span-1 text-right'>Mô tả:</span>
            <div className='col-span-11'>
              <Editor
                value={editorData}
                onChange={(data: string) => {
                  setEditorData(data)
                }}
              ></Editor>
            </div>
          </div>
          <div className=' flex  items-center justify-center mt-3'>
            <HandleSubmit
              editorData={editorData}
              file={file}
              fileList={fileList}
              form={form}
              formClassify={formClassify}
              setLoading={setLoading}
            />
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default AdminAddProduct
