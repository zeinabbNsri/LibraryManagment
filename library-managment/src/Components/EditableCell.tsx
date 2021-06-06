import { Form, Input, InputNumber } from 'antd';
import { FC } from 'react';

interface Props {
    editing: any,
    dataIndex?: any,
    title?: any,
    inputType?: any,
    record?: any,
    index?: any,
    children?: any,
  }

const EditableCell: FC<Props> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    console.log(children)
    return (
        <td {...restProps}>
            {editing ? ( // check if row is on edit mode, render editable Fiels for editing
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;