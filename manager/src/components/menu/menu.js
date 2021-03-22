import React from "react";
import "./menu.scss";
import { Menu, Icon, Button } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;
const menuWidth = "250px";

class MenuLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuWidth: menuWidth,
    };
    this.toogleMenu = this.toogleMenu.bind(this);
  }
  toogleMenu() {
    this.setState({
      collapsed: !this.state.collapsed,
      menuWidth: this.state.menuWidth == "auto" ? menuWidth : "auto",
    });
  }
  render() {
    const iconClass = [
      "pie-chart",
      "desktop",
      "inbox",
      "pie-chart",
      "desktop",
      "inbox",
      "pie-chart",
      "desktop",
      "inbox",
    ];
    return (
      <div
        style={{ width: this.state.menuWidth, height: "100vh" ,position:"sticky",top:"0",left:"0",zIndex:"2"}}
        id="menu-layout"
      >
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          className="leftMenu"
        >
          <Menu.Item
            key="0"
            onClick={this.toogleMenu}
            style={{
              background: "linear-gradient(to right, #ff9d01, #ffaa01)",
              height: "9vh",
            }}
          >
            <Icon
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            ></Icon>
            <span style={{ fontSize: "1.4rem" }}>TTAN</span>
          </Menu.Item>
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Student</span>
              </span>
            }
          >
            <MenuItem key="nav1">
              <Link to="/studentList">
                <Icon type="mail" />
                <span> Student List</span>
              </Link>
            </MenuItem>
            <MenuItem key="nav2">
              <Link to="/student">
                <Icon type="mail" />
                <span>Student Detail</span>
              </Link>
            </MenuItem>
          </SubMenu>
          <Menu.Item key="event">
            <Link to="/editEvent">
              <Icon type="mail"></Icon>
              <span>Edit Content </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="eventList">
            <Link to="/eventList">
              <Icon type="mail"></Icon>
              <span>Content List</span>
            </Link>
          </Menu.Item> */}
          <Menu.Item key="achivement">
            <Link to="/achivement">
              <Icon type="mail"></Icon>
              <span> Achivement</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default MenuLeft;
