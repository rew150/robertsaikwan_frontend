import { Menu } from 'antd';
import React, { useState } from 'react';

export const defaultMenu = "Page 1"

const menus = [
  {
    name: "Page 1",
    icon: undefined,
  },
  {
    name: "Page 2",
    icon: undefined,
  }
]

function SideMenu(props) {

  const { onChange, selectedMenu } = props
  const [selectedKey, setSelectedKey] = useState(defaultMenu)

  const handleChange = (key) => () => {
    if (onChange) {
      onChange(key)
    } else {
      setSelectedKey(key)
    }
  }

  const key = selectedMenu ? selectedMenu : selectedKey;

  return (
    <Menu theme="dark" defaultSelectedKeys={defaultMenu} mode="inline" {...props} selectedKeys={key}>
      {
        menus.map(v => (
          <Menu.Item key={v.name} icon={v.icon} onClick={handleChange(v.name)}>
            {v.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );
}

export default SideMenu;
