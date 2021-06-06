import { Table, Space, Popconfirm, Form, Button } from 'antd';
import SearchForm from './SearchFrom'
import { useSelector, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { updateAthors } from '../Actions/actions';
import { useDispatch } from "react-redux";
import EditableCell from './EditableCell'

function AuthorsList() {
    const authors = useSelector((state: RootStateOrAny) => state.authors);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [editingKey, setEditingKey] = useState('');
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const isEditing = (record: any) => record.key === editingKey;
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const filters = [
        {
            title: `author's name`,
            name: 'firstName'
        }
    ]

    const handleSearch = (searchResult: any, filtered: boolean) => {
        setIsFiltered(filtered)
        setFilteredList(searchResult);
    }

    useEffect(() => {
        if (!isFiltered) setFilteredList([])
    }, [isFiltered]);

    const handleDelete = (key: string) => {
        const dataSource = [...authors];
        dispatch(updateAthors(dataSource.filter(item => item.key != key)))
    }

    const handleCancel = () => {
        setEditingKey('');
    };

    const handleSave = async (key: string) => {
        const data = !!filteredList.length || isFiltered ? filteredList : authors;
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        const item = newData[Number(key)];
        newData.splice(index, 1, { ...item, ...row }); // update edited information
        dispatch(updateAthors(newData))
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
        setEditingKey(record.key);
    };

    const columns = [
        {
            title: "Index",
            dataIndex: "key",
            key: "key",
            editable: true,
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            editable: true,
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            editable: true,
        },
        {
            title: "Number of books",
            dataIndex: "booksCount",
            key: "booksCount",
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text: string, record: any) => {
                const editable = isEditing(record);
                return editable ? ( // if record is on edit mode:
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => handleSave(record.key)}
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
                ) : ( // if record isn't on edit mode:
                    <Space size="middle">
                        <Button disabled={editingKey !== ''} onClick={() => handleEdit(record)}>Edit</Button>
                        <Button onClick={() => handleDelete(record.key)}>Delete</Button>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => { // Specifies how each row should be displayed(edit or view)
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
            <SearchForm filters={filters} onSearch={handleSearch} openedFromAuthorList={true}/>
            <Form form={form} component={false}>
                <Table dataSource={isFiltered ? filteredList :authors}
                    bordered
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns}
                />
            </Form>
            <Link to="/defineAuthor">Add new author</Link>
        </div>
    );
}

export default AuthorsList;
