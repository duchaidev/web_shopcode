import { Upload, UploadFile, UploadProps } from 'antd'
import React, { FC, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import Editor from '@/components/atoms/Editor'

const ImageProduct: FC<{
  fileImage: UploadFile[]
  setFileImage: (value: UploadFile[]) => void
  file: any[]
  setFile: (value: any[]) => void
  fileListImage: UploadFile[]
  setFileListImage: (value: UploadFile[]) => void
  fileList: any[]
  setFileList: (value: any[]) => void
}> = ({ fileImage, setFileImage, file, setFile, fileListImage, setFileListImage, fileList, setFileList }) => {
  const url = import.meta.env.VITE_PUBLIC_STORAGE_API
  // const handleRemove = async (file) => {
  //     // Gọi API để xóa ảnh từ máy chủ
  //     try {
  //         await fetch('http://20.197.228.63:8080/delete', {
  //             method: 'DELETE',
  //             body: JSON.stringify({ file: file.name }), // Truyền tên file cần xóa
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             }
  //         });
  //         message.success(`${file.name} đã được xóa khỏi máy chủ.`);
  //     } catch (error) {
  //         console.error('Lỗi khi xóa ảnh từ máy chủ:', error);
  //         message.error(`Đã xảy ra lỗi khi xóa ${file.name} từ máy chủ.`);
  //     }
  // };
  const handleChangeFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImage(newFileList)
    setFile(
      newFileList?.map((item: UploadFile) => {
        const urlWithoutDomain = item.response?.result ? item.response?.result[0]?.url : item.url
        return urlWithoutDomain
      })
    )
  }
  const handleChangeListFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileListImage(newFileList)
    setFileList(
      newFileList?.map((item: UploadFile) => {
        console.log(item)
        const urlWithoutDomain = item.response?.result ? item.response?.result[0]?.url : item.url
        return urlWithoutDomain
      })
    )
  }

  return (
    <div>
      <div className='grid grid-cols-12 gap-2'>
        <span className='col-span-1 text-right'>Ảnh bìa:</span>
        <div className='col-span-11'>
          <Upload
            accept='image/*'
            fileList={fileImage}
            onChange={handleChangeFile}
            listType='picture-card'
            action={`${url}/upload`}
          >
            {file?.length >= 1 ? null : (
              <div className='flex flex-col gap-1 items-center justify-center'>
                <UploadOutlined style={{ fontSize: '18px' }} />
                <span>{file?.length}/1</span>
              </div>
            )}
          </Upload>
          <span className='font-medium text-red-400'>
            Khuyến cáo ảnh tải lên ở tỉ lệ 16/9 để hiển thị được tốt nhất
          </span>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-2 mt-4'>
        <span className='whitespace-nowrap col-span-1 text-end'>Ảnh sản phẩm:</span>
        <div className='col-span-11'>
          <Upload
            accept='image/*'
            fileList={fileListImage}
            onChange={handleChangeListFile}
            listType='picture-card'
            action={`${url}/upload`}
            multiple
            maxCount={5}
            // onRemove={handleRemove}
          >
            {fileList?.length >= 5 ? null : (
              <div className='flex flex-col gap-1 items-center justify-center'>
                <UploadOutlined style={{ fontSize: '18px' }} />
                <span>{fileList?.length}/5</span>
              </div>
            )}
          </Upload>
        </div>
      </div>
    </div>
  )
}

export default ImageProduct
