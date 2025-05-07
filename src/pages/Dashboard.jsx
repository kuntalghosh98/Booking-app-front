import React, { useState, useEffect } from 'react';
import { Card, Statistic, Table, message } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = ({ business }) => {
  const [stats, setStats] = useState({
    todayBookings: 0,
    pendingBookings: 0,
    waitTime: business?.currentWaitTime || 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsRes, statsRes] = await Promise.all([
          api.get('/bookings?limit=5'),
          api.get('/business/stats')
        ]);
        
        setRecentBookings(bookingsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        message.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (business) {
      fetchDashboardData();
    }
  }, [business]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Time',
      dataIndex: 'slotTime',
      key: 'slotTime',
      render: time => new Date(time).toLocaleTimeString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => status.charAt(0).toUpperCase() + status.slice(1)
    }
  ];

  return (
    <div className="dashboard">
      <h1>Business Dashboard</h1>
      
      <div className="stats-row">
        <Card>
          <Statistic
            title="Today's Bookings"
            value={stats.todayBookings}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Pending Approvals"
            value={stats.pendingBookings}
            prefix={<UserOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Current Wait Time"
            value={stats.waitTime}
            suffix="minutes"
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </div>

      <Card 
        title="Recent Bookings" 
        className="bookings-card"
        loading={loading}
      >
        <Table 
          columns={columns} 
          dataSource={recentBookings} 
          rowKey="_id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;