import './Admin.css';
import React, { useState } from 'react';
import { Input, Form, Button, Spin, message, Modal } from 'antd';
import { kyp } from '../utils/kyp';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

function Admin() {

  const [isLoading, setIsLoading] = useState(false)

  async function onFinish(value) {
    setIsLoading(true)
    try {
      const res = await kyp.post('news', {json:value}).json();
      Modal.success({
        title: 'News was successfully summarized',
        content: (
          <>
            <b>Summarized Text:</b>
            <p>
              {res.summary}
            </p>
          </>
        )
      })
    } catch (error) {
      if (error instanceof kyp.HTTPError) {
        if (error.response.status === 409) {
          message.error('News with the same name was already inserted into the system.')
        } else {
          message.error('Unexpected error')
          console.error(error)
        }
      } else {
        message.error('Unexpected error')
        console.error(error)
      }
    }
    setIsLoading(false)
  }

  return (
    <Spin spinning={isLoading}>
      <div className='admin-root'>
        <div className='admin-content'>
          <Form
            {...layout}
            onFinish={onFinish}
          >
            <Form.Item label={' '}>
              <h1>ส่งข่าว</h1>
            </Form.Item>
            <Form.Item
              label='หัวข้อ'
              name='name'
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='เนื้อข่าว'
              name='textbody'
              rules={[{required: true}]}
            >
              <Input.TextArea rows={10} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
}
export default Admin;
