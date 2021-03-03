import './studentList.scss';
import React from 'react';
import ReactDom from 'react-dom';
import {Table,Input,Button,Icon, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import MainTitle from '../../layout/mainTitle';
import GetColumnSearchProps from '../../function'
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags:  'developer',
  },
  {
    key: '2',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags:  'developer',
  },
  {
    key: '3',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags:  'developer',
  },
  {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags:  'developer',
  },
]
const StudentModal = (prop) =>(
  <Modal
    title="Student Information"
    visible = {prop.visible}
    onCancel={prop.handleCancel}
  >
    <div>
      <div>
         <img>
          
         </img>
      </div>
      <div>
         <div>
           <h3>

           </h3>
           <p>

           </p>
         </div>
         <div>
           <table>
             <tr>
               <td>

               </td>
               <td>

               </td>
             </tr>
           </table>
         </div>
      </div>
    </div>
  </Modal>
)
class StudentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            visible:false
        }
        // this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    // getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //       <div style={{ padding: 8 }}>
    //         <Input
    //           ref={node => {
    //             this.searchInput = node;
    //           }}
    //           placeholder={`Search ${dataIndex}`}
    //           value={selectedKeys[0]}
    //           onChange={e => {
    //               setSelectedKeys(e.target.value ? [e.target.value] : []);
    //             }}
    //           onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
    //           style={{ width: 188, marginBottom: 8, display: 'block' }}
    //         />
    //       </div>
    //     ),
    //     filterIcon: filtered => (
    //       <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    //     ),
    //     onFilter: (value, record) =>
    //       record[dataIndex]
    //         .toString()
    //         .toLowerCase()
    //         .includes(value.toLowerCase()),
    //     onFilterDropdownVisibleChange: visible => {
    //       if (visible) {
    //         setTimeout(() => this.searchInput.select());
    //       }
    //     },
    //     render: text =>
    //       this.state.searchedColumn === dataIndex ? (
    //         <Highlighter
    //           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //           searchWords={[this.state.searchText]}
    //           autoEscape
    //           textToHighlight={text.toString()}
    //         />
    //       ) : (
    //         text
    //       ),
    //   });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter : (a,b) => a.name.length - b.name.length,
              ellipsis: true,
              render: text => <a>{text}</a>,
              // ...GetColumnSearchProps()
            },
            {
                title:"address",
                key:"address",
                dataIndex:'address',
                sorter : (a,b) => a-b
            },
            {
                title:"phone",
                key:"phone",
                dataIndex:'phone',
                sorter : (a,b) => a-b
            },
            {
                title:"class",
                key:"class",
                dataIndex:'class',
                sorter : (a,b) => a-b
            },
            {
                title:"tags",
                key:"tags",
                dataIndex:"tags",   
            },
            {
              title:"",
                key:"action",
                dataIndex:"action",   
                render: (text, record) =>(
                    <span>
                      <Icon type='info' onClick={this.showModal.bind(this)}/>
                      <Icon type='delete'/>
                    </span>
                )
            }
        ]
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }),
        }
        return(
            <div>
                <div>
                    <MainTitle title="Student List" />  
                </div>
                <div style={{background:'white',padding:"15px"}}>
                    <div>
                        <h3 className='screenTitle'>All Students</h3>
                        <Icon type='reload' style={{color:'orange'}} onClick="/" />
                        <Icon type='delete' style={{color:'red'}} onClick="/" />
                    </div>
                    <div className='layoutSearch'>k
                        <Input placeholder="Search by student name"></Input>
                        <Input placeholder="Search by class name"></Input>
                        <Button type="primary" style={{background:'orange'}}> Search</Button>
                    </div>
                    <Table rowSelection={rowSelection} bordered columns={columns} dataSource={data} pagination={{pageSize:50}}/>
                </div>
                <StudentModal visible={this.state.visible} handleCancel={this.handleCancel}></StudentModal>
            </div>
        );
    }
}
export default StudentList;