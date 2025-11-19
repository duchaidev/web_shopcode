import { uploadImage } from '@/repository/UploadApi'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { message } from 'antd'
import { FC, useState } from 'react'

const Editor: FC<{ value: any; onChange: Function; propsChildType?: any }> = ({ value, onChange, propsChildType }) => {
  const [isFocus, setIsFocus] = useState(false)
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file: any) => {
            body.append('file', file)
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
              message.error('Ảnh có định dạng là png/jpg')
              return
            }
            const isLt2M = file.size / 1024 / 1024 / 1024 < 4
            if (!isLt2M) {
              message.error('Ảnh phải nhỏ hơn 400kb!')
              return
            }
            fetch(uploadImage(), {
              method: 'post',
              body: body
              // mode: "no-cors"
            })
              .then(async (res) => {
                const response = await res.json()
                return import.meta.env.VITE_PUBLIC_STORAGE_API + '/' + response.data
              })
              .then((res) => {
                if (res)
                  resolve({
                    default: res
                  })
              })
              .catch((err) => {
                message.error('Có lỗi xảy ra!')
              })
          })
        })
      }
    }
  }
  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
  }

  return (
    <div className='relative'>
      <p
        className={`${
          isFocus ? 'opacity-100 ' : 'opacity-0 transition-opacity duration-200'
        } bg-white absolute rounded-md z-[1001] text-[10px]  border border-[#fa8c16] font-semibold flex items-center justify-center bottom-[-10px] right-1 w-32 h-5`}
      >
        POWERED BY DUCHAI.DEV
      </p>
      <CKEditor
        {...propsChildType}
        editor={ClassicEditor}
        data={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
        config={{
          extraPlugins: [uploadPlugin],
          mediaEmbed: {
            previewsInData: true
          }
        }}
      />
    </div>
  )
}

export default Editor
