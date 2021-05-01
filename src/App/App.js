import './App.css'
import { Layout, Breadcrumb } from 'antd';
import { useState } from 'react';
import ModelOptions, { defaultModel } from './ModelOptions';
import SideMenu, { defaultMenu } from './SideMenu';
import LoremIpsum from '../utils/LoremIpsum';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState(defaultModel);
  const [menu, setMenu] = useState(defaultMenu);

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
        <SideMenu onChange={onMenuChange} selectedMenu={menu} />
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
          <div className="site-layout-background site-inner-content">
            <LoremIpsum paragraphNo={20} />
          </div>
          <Footer className="footer">RoBERTSaiKwan ©2021</Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
