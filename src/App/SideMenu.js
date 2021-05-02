import { Menu } from 'antd';
import React, { useState } from 'react';
import { PicLeftOutlined } from '@ant-design/icons'

function SideMenu(props) {

  const { onChange, selectedMenu, menus = [] } = props
  const [selectedKey, setSelectedKey] = useState('')

  const handleChange = (key) => () => {
    if (onChange) {
      onChange(key)
    } else {
      setSelectedKey(key)
    }
  }

  const key = selectedMenu ? selectedMenu : selectedKey;

  return (
    <Menu theme="dark" defaultSelectedKeys={''} mode="inline" {...props} selectedKeys={key}>
      {
        menus.map(v => (
          <Menu.Item key={v.name} icon={<PicLeftOutlined />} onClick={handleChange(v.name)}>
            {v.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );
}

export default SideMenu;
