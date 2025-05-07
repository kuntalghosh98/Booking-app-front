import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  TimePicker, 
  Select, 
  Form, 
  message,
  Modal,
  Switch
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api from '../services/api';
import './Availability.css';

const { Option } = Select;

const Availability = ({ business }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (business) {
      fetchAvailability();
    }
  }, [business]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/businesses/${business._id}/availability`);
      setSlots(response);
    } catch (error) {
      message.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async (values) => {
    try {
      await api.post(`/businesses/${business._id}/availability`, values);
      message.success('Slot added successfully');
      fetchAvailability();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add slot');
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await api.delete(`/businesses/${business._id}/availability/${slotId}`);
      message.success('Slot deleted successfully');
      fetchAvailability();
    } catch (error) {
      message.error('Failed to delete slot');
    }
  };

  const handleToggleAvailability = async (slotId, available) => {
    try {
      await api.patch(`/businesses/${business._id}/availability/${slotId}`, { available });
      message.success('Slot updated successfully');
      fetchAvailability();
    } catch (error) {
      message.error('Failed to update slot');
    }
  };

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: day => day.charAt(0).toUpperCase() + day.slice(1)
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime'
    },
    {
      title: 'Max Capacity',
      dataIndex: 'maxCapacity',
      key: 'maxCapacity'
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available, record) => (
        <Switch 
          checked={available} 
          onChange={(checked) => handleToggleAvailability(record._id, checked)}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleDeleteSlot(record._id)}
        />
      )
    }
  ];

  return (
    <div className="availability-page">
      <div className="page-header">
        <h1>Manage Availability</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Slot
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={slots}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      <Modal
        title="Add New Availability Slot"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSlot}
        >
          <Form.Item
            name="day"
            label="Day"
            rules={[{ required: true, message: 'Please select a day' }]}
          >
            <Select placeholder="Select day">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <Option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please select start time' }]}
          >
            <TimePicker format="HH:mm" minuteStep={15} />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please select end time' }]}
          >
            <TimePicker format="HH:mm" minuteStep={15} />
          </Form.Item>

          <Form.Item
            name="maxCapacity"
            label="Max Capacity"
            rules={[{ required: true, message: 'Please enter max capacity' }]}
          >
            <Select>
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(num => (
                <Option key={num} value={num}>{num}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Slot
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Availability;