import React from 'react';
import {Form,Input,Icon} from 'antd';
import Highlighter from 'react-highlight-words';
const EditableContext = React.createContext();

// const EditableRow = ({ form, index, ...props }) => (
//     <EditableContext.Provider value={form}>
//       <tr {...props} />
//     </EditableContext.Provider>
//   );
  

  
//   class EditableCell extends React.Component {
//     state = {
//       editing: false,
//     };
  
//     toggleEdit = () => {
//       const editing = !this.state.editing;
//       this.setState({ editing }, () => {
//         if (editing) {
//           this.input.focus();
//         }
//       });
//     };
  
//     save = e => {
//       const { record, handleSave } = this.props;
//       this.form.validateFields((error, values) => {
//         if (error && error[e.currentTarget.id]) {
//           return;
//         }
//         this.toggleEdit();
//         handleSave({ ...record, ...values });
//       });
//     };
  
//     renderCell = form => {
//       this.form = form;
//       const { children, dataIndex, record, title } = this.props;
//       const { editing } = this.state;
//       return editing ? (
//         <Form.Item style={{ margin: 0 }}>
//           {form.getFieldDecorator(dataIndex, {
//             rules: [
//               {
//                 required: true,
//                 message: `${title} is required.`,
//               },
//             ],
//             initialValue: record[dataIndex],
//           })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
//         </Form.Item>
//       ) : (
//         <div
//           className="editable-cell-value-wrap"
//           style={{ paddingRight: 24 }}
//           onClick={this.toggleEdit}
//         >
//           {children}
//         </div>
//       );
//     };
  
//     render() {
//       const {
//         editable,
//         dataIndex,
//         title,
//         record,
//         index,
//         handleSave,
//         children,
//         ...restProps
//       } = this.props;
//       return (
//         <td {...restProps}>
//           {editable ? (
//             <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
//           ) : (
//             children
//           )}
//         </td>
//       );
//     }
//   }
   const  GetColumnSearchProps = (dataIndex,searchedColumn
      ,searchText) => ({
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
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });
    export default GetColumnSearchProps;
  // export default {EditableRow,EditableCell};