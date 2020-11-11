import { Layout, Typography, } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../components/Auth'
import UserImages from '../components/UserImages';
import { checkAuthAsync } from '../redux/auth/action'
import { RootState } from '../redux/store';
import './styles.scss'


const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuthAsync())
  }, [])

  return (
    <Layout className="app">
      <Header className="app-header">
        <Title level={2} className="header-title">
          Videolevels Technical Test
                </Title>
      </Header>
      <Content className="app-content">
        {user ? (
          <UserImages />
        ) : (
            <Auth />
          )}

      </Content>
      <Footer className="app-footer">
        Firas Mezghani productions (FouMez) ©2020
            </Footer>
    </Layout>
  )
};


export default App;
