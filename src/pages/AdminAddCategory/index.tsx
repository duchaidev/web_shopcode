import { Form, Radio, RadioChangeEvent } from 'antd'
import { useNavigate } from 'react-router-dom'
import TabManageCategory from './components/TabManageCategory'
import TabManageTechnology from './components/TabManageTechnology'

const AdminAddCategoryPage = () => {
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const type = params.get('type')
  const handleModeChange = (e: RadioChangeEvent) => {
    params.set('type', String(e.target.value))
    const newUrl = `${location.pathname}?${params.toString()}`
    navigate(newUrl)
  }
  return (
    <div>
      <Radio.Group onChange={handleModeChange} value={type || 'category'} style={{ marginBottom: 8 }}>
        <Radio.Button value='category'>Phân loại</Radio.Button>
        <Radio.Button value='tech'>Công nghệ sử dụng</Radio.Button>
      </Radio.Group>
      {(!type || type === 'category') && <TabManageCategory />}
      {type === 'tech' && <TabManageTechnology />}
    </div>
  )
}

export default AdminAddCategoryPage
