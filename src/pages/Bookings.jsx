import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  DatePicker, 
  Select, 
  Input,
  message
} from 'antd';
import { 
  SearchOutlined, 
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined 
} from '@ant-design/icons';
import api from '../services/api';
import './Bookings.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Bookings = ({ business }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: undefined,
    dateRange: undefined,
    search: undefined
  });

  useEffect(() => {
    if (business) {
      fetchBookings();
    }
  }, [business, pagination.current, filters]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        businessId: business._id,
        ...filters
      };

      if (filters.dateRange) {
        params.startDate = filters.dateRange[0].format('YYYY-MM-DD');
        params.endDate = filters.dateRange[1].format('YYYY-MM-DD');
      }

      const response = await api.get('/bookings', { params });
      setBookings(response.data);
      setPagination({
        ...pagination,
        total: response.total
      });
    } catch (error) {
      message.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status });
      message.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      message.error('Failed to update booking');
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSearch = (values) => {
    setFilters(values);
    setPagination({ ...pagination, current: 1 });
  };

  const statusColors = {
    pending: 'orange',
    confirmed: 'green',
    cancelled: 'red',
    completed: 'blue'
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Booking Time',
      dataIndex: 'slotTime',
      key: 'slotTime',
      render: time => new Date(time).toLocaleString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button 
                icon={<CheckCircleOutlined />} 
                type="text" 
                onClick={() => handleStatusChange(record._id, 'confirmed')}
              />
              <Button 
                icon={<CloseCircleOutlined />} 
                type="text" 
                danger
                onClick={() => handleStatusChange(record._id, 'cancelled')}
              />
            </>
          )}
          {record.status === 'confirmed' && (
            <Button 
              type="text" 
              onClick={() => handleStatusChange(record._id, 'completed')}
            >
              Mark Complete
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="bookings-page">
      <div className="filters">
        <RangePicker 
          onChange={(dates) => handleSearch({ ...filters, dateRange: dates })}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Filter by status"
          allowClear
          style={{ width: 150 }}
          onChange={(value) => handleSearch({ ...filters, status: value })}
        >
          <Option value="pending">Pending</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="cancelled">Cancelled</Option>
          <Option value="completed">Completed</Option>
        </Select>
        <Input
          placeholder="Search customer"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          onChange={(e) => handleSearch({ ...filters, search: e.target.value })}
        />
        <Button 
          icon={<SyncOutlined />} 
          onClick={fetchBookings}
        />
      </div>

      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Bookings;