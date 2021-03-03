import './student.scss';
import React,{useState} from 'react';
import Highlighter from 'react-highlight-words';
import GetColumnSearchProps from '../function'
import {Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Comment,
    Progress,
    AutoComplete,Avatar,Table} from 'antd';
import MainTitle from '../layout/mainTitle';
import moment from 'moment';

const {TextArea} = Input;
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 5},
        sm: { span: 5 },
      },
      labelAlign:'left',
      wrapperCol: {
        xs: { span: 19 },
        sm: { span: 19 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
      labelCol:{
        span:6
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
            <Row>
              <Col span={6}>
                <Avatar size={124} src='./user.png' />
              </Col>
              <Col span={18}>
                <TextArea rows={6}></TextArea>
              </Col>
            </Row>

        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
            <Input/>
        </Form.Item>
        <Form.Item label="Website">
              <Input />
       
        </Form.Item>
        <Form.Item label="Website">
              <Input />
       
        </Form.Item>
        <Form.Item label="Website">
              <Input />
       
        </Form.Item>
        <Form.Item label="Website">
              <Input />
       
        </Form.Item>        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const StudentForm = Form.create({name:"studentDetail"})(RegistrationForm);
class StudentTableScore extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
    }
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  render(){
    const column = [
      {
        title:"ID",
        align:'center',
        dataIndex:"id",
        key:"id",
        sorter: (a,b) => a.id.length - b.id.length,
        ...this.getColumnSearchProps('id')
      },
      {
        title:"Class",
        key:'class',
        align:'center',
        dataIndex:'class',
        sorter: (a,b) => a.id.length - b.id.length,
      },
      {
        title:"Midterm",
        children:[
          {
            title:"Writing",
            key:"writingMid",
            dataIndex:"writingMid",
            align:'center',
          },
          {
            title:"Speaking",
            key:"speakingMid",
            dataIndex:"speakingMid",
            align:'center'
          }
        ]
      },
      {
        title:"Final",
        children:[
          {
            title:"Writing",
            key:"writingFnl",
            align:'center',
            dataIndex:"writingFnl"
          },
          {
            title:"Speaking",
            key:"speakingFnl",
            align:'center',
            dataIndex:"speakingFnl"
          }
        ]
      },
      // {
      //   title:"",
      //     key:"action",
      //     dataIndex:"action",   
      //     render: (text, record) =>(
      //         <span>
      //           <Icon type='info' onClick={this.showModal.bind(this)}/>
      //           <Icon type='delete'/>
      //         </span>
      //     )
      // }
    ]
    const data = [
      {
        key:'1',
        id:'123'
      }
    ]
    return(
      <div>
        <Table bordered columns={column} dataSource={data}/>
      </div>
    )
  }
}
const Note = (props) =>{
  
  return(
    <div>
        <Comment
          author={<a>{props.name}</a>}
          avatar={
            <Avatar src='./user.png' alt='Dj'/>
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
            </p>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
          }
        />
    </div>
  )
}
const StudentAttendence = (props) =>{
  var column = [];
  var data = [];
  column = props.attendenceList.map( item =>{
    return {
      key:item.id,
      dataIndex:item.id,
      title:item.name
    }
  });
  column.unshift(
  {
      key:"id",
      dataIndex:"id",
      title:"ID",
      sorter: (a,b) => a.id.length - b.id.length
  });
  column.unshift({
      key:"name",
      dataIndex:"name",
      title:"Name",
      sorter: (a,b) => a.name.length - b.name.length
    });
  return(
    <div>
      <Table
        columns={column}
        data={data}
      >
        
      </Table>
    </div>
  )
}
const AttendencePercents = props =>{
  return(
    <div>
      <Progress type='circle' percent={75} />
    </div>
  )
}
class Student extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div>
                   <MainTitle title='Student Detail'/>
                </div>
                <div className='content-layout'>
                    <h1>Student Information</h1>
                    <StudentForm />
                </div>
                <div className='content-layout'>
                    <h1>All Exam Result</h1>
                    <StudentTableScore />
                </div>
                <div className='content-layout'>
                    <h1>Note</h1>
                    <Note name='David Huy'/>
                </div>
                
                  <Row>
                    <Col span={16}>
                      <div className='content-layout'>
                        <h1>Attendence</h1>
                        <StudentAttendence attendenceList=
                        {[
                          {
                            id:"c1",
                            name:"date1",
                            value:"checked"
                          }
                        ]} />
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className='content-layout'>
                        <h1>Attendence Percentage</h1>
                        <AttendencePercents />
                    </div>
                    </Col>
                  </Row>
                  
   
                
                </div>
               
        )
    }
}
export default Student;