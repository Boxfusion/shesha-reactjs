import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const LayoutSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState('');

  console.log('LayoutSider collapsed, key: ', collapsed, key);

  const onClick = (e: { key: string }) => {
    return setKey(e.key);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0" collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />} onClick={onClick}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={onClick}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />} onClick={onClick}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} onClick={onClick}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const LayoutPage = () => {
  console.log('LayoutPage ....');

  return (
    <Layout>
      <LayoutSider />
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
