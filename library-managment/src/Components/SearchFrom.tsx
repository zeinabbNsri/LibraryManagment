import { Form, Row, Col, Input, Button, Select } from "antd";
import { useSelector, RootStateOrAny } from "react-redux";
import Fuse from 'fuse.js'

interface SearchFromProps {
    filters: any[];
    onSearch: (value: any, isFiltered: boolean) => void;
    showAuthorFilter?: boolean;
    openedFromAuthorList?: boolean;
}

function SearchFrom({ filters, onSearch, showAuthorFilter, openedFromAuthorList }: SearchFromProps) {
    const [form] = Form.useForm();
    const books: any[] = useSelector((state: RootStateOrAny) => state.books);
    const authors: any[] = useSelector((state: RootStateOrAny) => state.authors);
    const { Option } = Select;

    const getFields = () => { // render filters as form Items
        const count = filters.length;
        const children = [];
        for (let i = 0; i < count; i++) { // push inputs and text filters
            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        name={filters[i].name}
                        label={filters[i].title}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            );
        }
        if (!!showAuthorFilter) { // check props to show author select box filter
            children.push(
                <Col span={8}>
                    <Form.Item
                        name={'author'}
                        label={'Author'}
                    >
                        <Select allowClear={true}>
                            {authors.map((author) => {
                                return <Option value={Number(author.key)}>{`${author.firstName} ${author.lastName}`}</Option>
                            })
                            }
                        </Select>
                    </Form.Item>
                </Col >
            );
        }
        return children;
    };

    const handleSearch = (searchValues: any) => {
        const isFiltersEmpty: boolean = Object.values(searchValues).every(x => (x === null || x === '' || x === undefined));
        if (!isFiltersEmpty) { // atleast one filter selected:
            let result: Fuse.FuseResult<any>[];
            const searchOptions = {
                includeScore: false,
                keys: !openedFromAuthorList ? ['title', 'score', 'publishedDate', 'subject', 'authorKey'] : ['firstName']
            }
            const fuseBook = new Fuse(books, searchOptions)
            const fuseAuthor = new Fuse(authors, searchOptions)
            !openedFromAuthorList ?
                result = fuseBook.search(
                    {
                        $or: [
                            { title: !!searchValues[filters[0]?.name] ? searchValues[filters[0]?.name] : '' },
                            { publishedDate: !!searchValues[filters[1]?.name] ? searchValues[filters[1]?.name] : '' },
                            { score: !!searchValues[filters[2]?.score] ? searchValues[filters[2]?.name] : '' },
                            { subject: !!searchValues[filters[3]?.subject] ? searchValues[filters[3]?.name] : '' },
                            { authorKey: !!searchValues?.author ? searchValues.author.toString() : '' },
                        ]
                    })
                :
                result = fuseAuthor.search(`'${searchValues.firstName}`)
            const newList: any[] = [];
            result.map((item) => {
                newList.push(item.item)
            })
            onSearch(newList, true)
        }
        else // there is no filter, show all list:
            onSearch([], false)
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={handleSearch}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign='left'
        >
            <Row>
                {getFields()}
            </Row>
            <Row>
                <Col span={8} ></Col>
                <Col span={8} ></Col>
                <Col span={8} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit" className='mb-30'>Search</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchFrom;
