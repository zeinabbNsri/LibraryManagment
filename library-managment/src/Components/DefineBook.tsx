import { Form, Input, Button, Alert, Space, InputNumber, Select } from "antd";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { createNewBook } from '../Actions/actions';
import { Link } from "react-router-dom";
import { useState } from 'react';

interface SubmitData {
  index: number,
  authorKey: number,
  title: string,
  score: number,
  subject: string,
  publishedDate: number,
}

function DefineBook() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { Option } = Select;
  const authors: any[] = useSelector((state: RootStateOrAny) => state.authors);

  function handleSubmit() {
    form.validateFields().then((values: SubmitData) => {
      dispatch(createNewBook(values));
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
                <Link to="/books" >
                  <Button size="small" type="text">
                    books list
                  </Button>
                </Link>
              </Space>
            }
            closable
          />
        }
        <Form.Item name={'title'} label="Title" rules={[{ required: true, message: 'required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'score'} label="Score" rules={[{ required: true, message: 'scrore is required and value must be from 1 to 10' }]}>
          <InputNumber min={1} max={10}/>
        </Form.Item>
        <Form.Item name={'Subject'} label="subject" rules={[{ required: true, message: 'required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'publishedDate'} label="Published Date" rules={[{ required: true, message: 'required' }]}>
          <Input type='number' />
        </Form.Item>
        <Form.Item name={'authorKey'} label="Author" rules={[{ required: true, message: 'required' }]}>
          <Select>
            {authors.map((author) => {
              return <Option value={author.key}>{`${author.firstName} ${author.lastName}`}</Option>
            })
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DefineBook;
