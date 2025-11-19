import { ConfigProvider, Spin, ThemeConfig } from 'antd'
import { useAppSelector } from './stores'
import MainRouter from './routers/MainRouter'
import { useEffect } from 'react'

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: '#12B799',
    colorBorder: '#D9D9D9',
    colorLink: '#12B799'
  }
}
// const dispatch = useAppDispatch();
// dispatch(setUser({
//   ...response?.user,
//   permissionId: responsePermission?.data?.permissionId,
//   permissionDeleteDocument: resPermissionDocument?.data?.listUserRoles.some(
//       (role: any) => role.roleId !== 4
//   ),
// }));

function App() {
  const { counterLoading } = useAppSelector((state) => state.common)

  return (
    <Spin spinning={counterLoading > 0 ? true : false}>
      <ConfigProvider theme={theme}>
        <MainRouter />
      </ConfigProvider>
    </Spin>
  )
}

export default App
