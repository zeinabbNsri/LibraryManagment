import { Table, Space, Button, Popconfirm, Form, Input, InputNumber } from 'antd';
import SearchForm from './SearchFrom'
import { useSelector, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { updateBooks, filterBooks } from '../Actions/actions';
import { useDispatch } from "react-redux";
import EditableCell from './EditableCell'

function BooksList({}) {
  const books = useSelector((state: RootStateOrAny) => state.books);
  const filteredBooks = useSelector((state: RootStateOrAny) => state.filteredBooks);
  const dispatch = useDispatch();
 // const [filteredList, setFilteredList] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: any) => record.index === editingKey;

  const filters = [
    {
      title: 'title',
      name: 'title'
    },
    {
      title: 'published date',
      name: 'publishedDate'
    },
    {
      title: 'score',
      name: 'score'
    },
    {
      title: 'subject',
      name: 'subject'
    }
  ]

  const handleDelete = (key: string) => {
    const dataSource = [...books];
    dispatch(updateBooks(dataSource.filter(item => item.index != key)))
  }

  const handleSearch = (searchResult: any, filtered: boolean) => {
    setIsFiltered(filtered)
    dispatch(filterBooks(searchResult))
  }

  useEffect(() => {
    if(!isFiltered) dispatch(filterBooks([]))
  }, [isFiltered]);

  const handleCancel = () => {
    setEditingKey('');
  };

  const handleSave = async (key: string) => {
    const data = !!filteredBooks.length || isFiltered ? filteredBooks : books;
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex((item) => Number(key) === item.index);
    const item = newData[Number(key)];
    newData.splice(index, 1, { ...item, ...row });
    dispatch(updateBooks(newData))
    setEditingKey('');
  };

  const handleEdit = (record: any) => {
    form.setFieldsValue({
      index: '',
      title: '',
      score: '',
      subject: '',
      publishedDate: '',
      ...record
    });
    setEditingKey(record.index);
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      editable: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "Published Date",
      dataIndex: "publishedDate",
      key: "publishedDate",
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text: string, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => handleSave(record.index)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <Button disabled={editingKey !== ''} onClick={() => handleEdit(record)}>Edit</Button>
            <Button onClick={() => handleDelete(record.index)}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <SearchForm filters={filters} onSearch={handleSearch} showAuthorFilter={true} />
      <Form form={form} component={false}>
        <Table
          dataSource={isFiltered ? filteredBooks : books}
          bordered
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
        />
      </Form>
      <Link to="/defineBook">Add new book</Link>
    </div>
  );
}

export default BooksList;
