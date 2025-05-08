import React from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { 
  DashboardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.css';

const { Header } = Layout;

const Navbar = ({ business }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: 'availability',
      icon: <CalendarOutlined />,
      label: <Link to="/availability">Availability</Link>,
    },
    {
      key: 'bookings',
      icon: <ClockCircleOutlined />,
      label: <Link to="/bookings">Bookings</Link>,
    }
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar">
      <div className="logo">
        {business?.name || 'Booking System'}
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
        className="nav-menu"
      />
      <Dropdown overlay={userMenu} placement="bottomRight">
        <div className="user-avatar">
          <Avatar icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar;