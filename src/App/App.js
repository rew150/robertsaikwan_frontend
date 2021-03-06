import './App.css'
import { Layout, Breadcrumb, message } from 'antd';
import { useEffect, useState } from 'react';
import ModelOptions, { defaultModel } from './ModelOptions';
import SideMenu from './SideMenu';
import TextWithHighLight from '../TextWithHighLight.js/TextWithHighLight';
import { kyp } from '../utils/kyp';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState(defaultModel);
  const [menu, setMenu] = useState('');
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await kyp.get('news').json();
        setMenus(res);
      } catch (error) {
        message.error('Unexpected error, please refresh');
        console.error(error);
      }
    })();
  },[])

  function onCollapse(collapse) {
    setCollapsed(collapse);
  }

  function onModelChange(value) {
    setModel(value);
  }

  function onMenuChange(value) {
    setMenu(value);
  }

  return (
    <Layout className="root-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='sider'>
        <div className="logo">
          <b>
            {
              collapsed ? "RBSK" : "RoBERTSaiKwan"
            }
          </b>
        </div>
        <SideMenu onChange={onMenuChange} selectedMenu={menu} menus={menus} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background header">
          <ModelOptions className='model-options' onChange={onModelChange} defaultValue={defaultModel} />
        </Header>
        <Content className="site-content">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>{model}</Breadcrumb.Item>
            <Breadcrumb.Item>{menu}</Breadcrumb.Item>
          </Breadcrumb>
          <TextWithHighLight className="site-layout-background site-inner-content" name={menu} />
          <Footer className="footer">RoBERTSaiKwan ©2021</Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
