import { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons'
import { deleteCookie } from '../Cookie'

export const items: MenuProps['items'] = [
  {
    key: '1',
    label: <NavLink to={'/profile'}>ProfilePage</NavLink>
  },
  {
    type: 'divider'
  },
  {
    key: '2',
    label: (
      <p
        onClick={() => {
          deleteCookie('accessToken')
          deleteCookie('refreshToken')
          window.location.href = '/dang-nhap'
        }}
      >
        Đăng xuất
      </p>
    )
  }
]
