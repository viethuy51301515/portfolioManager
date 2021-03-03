import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {eventRef} from '../../../firebase'
import { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  notification,
  Modal,
  Form,
  Icon,
  Input,
  Button,
  Upload,
  message,
} from "antd";
import { teacherRef } from "../../firebase";
import { teacherStore } from "../../firebase";
import { getAchivement } from "../../api";
// import { LoadingOutlined, PlusOutlined,UserAddOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false,
        });
        this.props.changeImg(info.file.originFileObj);
      });
    }
  };
  // componentDidMount (){
  //   this.props.changeImg(this.state.imageUrl);
  // }
  render() {
    const uploadButton = (
      <div>
        {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
const EdtitableTeacher = (props) => {
  // const {visible,setVisible} = useState(props.isVisible);
  const [data, setData] = useState({
    name: "",
    pos: "",
    des: "",
    id: "",
  });

  const handleSubmit = () => {
    var id = document.getElementById("id").value;
    var timeTime = new Date().getTime();
    if (id != "") {
      teacherRef.child(data.key).update({
        name: data.name,
        pos: data.pos,
        des: data.des,
        image: id,
        id: id,
      });
      notification.success({
        message: "Tựa đề thông báo",
        description: "Bạn đã lưu dữ liệu thành công",
      });
      teacherStore
        .child(id)
        .put(data.image)
        .then(function (snapshot) {
          console.log("Uploaded a blob or file!");
        });
    } else {
      teacherRef.push({
        name: data.name,
        pos: data.pos,
        des: data.des,
        image: timeTime,
        id: timeTime,
      });
      notification.success({
        message: "Tựa đề thông báo",
        description: "Bạn đã lưu dữ liệu thành công",
      });
      teacherStore
        .child(timeTime)
        .put(data.image)
        .then(function (snapshot) {
          console.log("Uploaded a blob or file!");
        });
    }
    // notification.success({
    //   message: 'Tựa đề thông báo',
    //   description:
    //       'Bạn đã lưu dữ liệu thành công'
    //   })
    // window.location="/teacher";
  };
  const changeValue = (id) => {
    var dataTemp = {
      name: id == "name" ? document.getElementById("name").value : data.name,
      pos: id == "pos" ? document.getElementById("pos").value : data.pos,
      des: id == "des" ? document.getElementById("des").value : data.des,
      id: data.id,
      image: data.image,
      key: data.key,
    };
    setData(dataTemp);
  };
  const changeImg = (image) => {
    var dataTemp = {
      name: data.name,
      pos: data.pos,
      des: data.des,
      id: data.id,
      image: image,
      key: data.key,
    };
    setData(dataTemp);
    console.log(dataTemp);
  };
  useEffect(() => {
    var dataTemp = {
      name: props.data.name,
      pos: props.data.pos,
      des: props.data.des,
      id: props.data.id,
      key: props.data.key,
    };
    console.log("uf" + props.data.name);
    setData(dataTemp);
  }, [props.data]);
  return (
    <div>
      <Modal
        visible={props.isVisible}
        footer=""
        title="Thông tin giáo viên"
        onOk={() => props.setModalVisible(false)}
        onCancel={() => {
          props.setModalVisible(false);
          window.location = "/teacher";
        }}
      >
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Name"
          id="name"
          value={data.name}
          onChange={() => changeValue("name")}
        />
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="pos"
          placeholder="Position"
          value={data.pos}
          onChange={() => changeValue("pos")}
        />
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="des"
          placeholder="Description"
          value={data.des}
          onChange={() => changeValue("des")}
        />
        <Avatar changeImg={changeImg} />
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="id"
          placeholder="id"
          value={data.id}
          onChange={() => changeValue("id")}
        />
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};
function Teacher(props) {
  const data = useSelector((state) => state.dataRe);
  const [selectedData, setSelectedData] = useState({});
  const [isShowModal, setShowModal] = useState(false);
  const [listTeacher, setListTeacher] = useState([]);
  const [isReload, setReload] = useState(false);
  const getListImg = async (listI) => {
    var listRef = teacherStore;
    var data = await new Promise(function (resolve) {
      listRef.listAll().then(function (res) {
        resolve(res);
      });
    });
    var list = [];
    for (let i = 0; i < data.items.length; i++) {
      const element = data.items[i];
      var item = await new Promise(function (resolve) {
        element.getDownloadURL().then(function (res) {
          resolve(res);
        });
      });
      list.push({
        image: item,
        id: element.name,
      });
    }
    var listTemp = [...listI];
    listTemp.map((item) => {
      var subItem = list.filter((sub) => sub.id == item.id);
      if (subItem.length > 0) {
        item.image = subItem[0].image;
      }
      return item;
    });
    setListTeacher(listTemp);
  };
  useEffect(async () => {
    var list = [];
    const data = await getAchivement();
    list = data;
    getListImg(list);
  }, []);
  const changeReload = () => {
    setReload(!isReload);
  };
  const handleDelete = (key, id) => {
    // setReload(!isReload);

    teacherRef.child(key).remove();
    // teacherStore.child(id).delete().then(function() {
    //   // File deleted successfully
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    // });
    notification.success({
      message: "Tựa đề thông báo",
      description: "Bạn đã xóa sự kiện thành công",
    });
    window.location = "/teacher";
  };
  const columns = [
    { title: "Date", dataIndex: "date", key: "date", editable: true },
    {
      title: "DESCRIPTION",
      dataIndex: "des",
      key: "des",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    { title: "Link", dataIndex: "link", key: "link" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div>
          <img
            style={{ height: "40px", width: "auto" }}
            src={record.image}
          />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Popconfirm
          title="Bạn có muốn xóa sự kiện này không"
          placement="topRight"
          onConfirm={() => {
            setSelectedData(record);
            setShowModal(true);
          }}
          okText="Yes"
          cancelText="No"
        >
          <a>Edit</a>
        </Popconfirm>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Popconfirm
          title="Bạn có muốn xóa sự kiện này không"
          placement="topRight"
          onConfirm={() => handleDelete(record.key, record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];
  const setModalVisible = (visible) => {
    setShowModal(visible);
  };
  return (
    <div className="event-list">
      <Button
        type="primary"
        onClick={() => {
          setSelectedData({});
          setShowModal(true);
        }}
      >
        Add
      </Button>
      <Table columns={columns} dataSource={listTeacher} />
      <EdtitableTeacher
        reload={changeReload}
        data={selectedData}
        isVisible={isShowModal}
        setModalVisible={setModalVisible}
      />
    </div>
  );
}
export default Teacher;
