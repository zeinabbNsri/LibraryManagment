import { Form, Input, Button, Alert, Space } from "antd";
import { useDispatch } from "react-redux";
import { createNewAuthor } from '../Actions/actions';
import { Link } from "react-router-dom";
import { useState } from 'react';

interface SubmitData {
  firstName: string;
  lastName: string;
}

function DefineAuthor() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState<boolean>(false);

  function handleSubmit() {
    form.validateFields().then((values: SubmitData) => {
      dispatch(createNewAuthor(values));
      setShowNotification(true);
    }).catch((er) => {
      setShowNotification(false);
    })
  }

  return (
    <>
      <Form
        layout={'vertical'}
        form={form}
      >
        {!!showNotification &&
          <Alert
            message="Information submitted successfully!"
            description="By clicking on the link below, you can see the list of authors..."
            type="success"
            showIcon
            action={
              <Space>
                <Link to="/authors" >
                  <Button size="small" type="text">
                    authors list
                  </Button>
                </Link>
              </Space>
            }
            closable
          />
        }
        <Form.Item name={'firstName'} label="First Name" rules={[{ required: true, message: 'required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'lastName'} label="Last Name" rules={[{ required: true, message: 'required' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DefineAuthor;
