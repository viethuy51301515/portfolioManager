import React, { Fragment } from 'react';
import './menu.scss';
import CONSTANT from '../../constants';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {getInfor} from '../../action';
import {MenuOutlined,CloseOutlined} from '@ant-design/icons';
const profileImg = require("../../image/hinhnen.jpg");
class HamburgerMenu extends React.Component{
    state = {
        hamburgerState : "open"
    }
    toggleMenu(){
        this.setState({
            hamburgerState : this.state.hamburgerState == 'open' ? "close" : "open"
        });
        document.getElementsByClassName('menu')[0].classList.toggle("menu__close");
        document.getElementsByClassName('hamburger-button')[0].classList.toggle("hambuger__close");
    }
    render(){
        return (
            <Fragment>
                 <button className='hamburger-button' onClick={this.toggleMenu.bind(this)}>
                     {
                         this.state.hamburgerState == "close" ?      <CloseOutlined /> :      <MenuOutlined />
                     }
               
                    {/* <span className={this.state.hamburgerState == "close" ? 'icon-hamburger-menu' : "icon-hamburger-menu-close"}>

                    </span> */}
                </button>
            </Fragment>
        )
    }
}
class Menu extends React.Component{
    state = {
        // hamburgerState : "open",
        currentMenuIndex:"1",
    }
    constructor(props){
        super(props);
        this.activeMenu = this.activeMenu.bind(this);
    }
    activeMenu(index){
        this.setState({
            currentMenuIndex:index
        })
    }
    render(){
        return(
            <Fragment>
                <HamburgerMenu />
                <div className='user-profile'>
                    <figure>
                        <img src={profileImg} alt=""/>
                    </figure>
                </div>
                <div className='menu-list'>
                    <ul>
                        <li className={this.state.currentMenuIndex == "1" ? "active" : ""} onClick={() => this.activeMenu(1)}><Link to='/portfolio'><a className='list--item'>Home</a></Link></li>
                        <li className={this.state.currentMenuIndex == "2" ? "active" : ""} onClick={() => this.activeMenu(2)}><Link to='/about'><a className='list--item'>About</a></Link></li>
                        <li className={this.state.currentMenuIndex == "3" ? "active" : ""} onClick={() => this.activeMenu(3)}><Link to='/resume'><a className='list--item'>Resume</a></Link></li>
                        <li className={this.state.currentMenuIndex == "4" ? "active" : ""} onClick={() => this.activeMenu(4)}><Link to='/portfolios'><a className='list--item'>Portfolios</a></Link></li>
                        <li className={this.state.currentMenuIndex == "5" ? "active" : ""} onClick={() => this.activeMenu(5)}><Link to='/achivement'><a className='list--item'>Achivement</a></Link></li>
                        <li className={this.state.currentMenuIndex == "6" ? "active" : ""} onClick={() => this.activeMenu(6)}><Link to='/contact'><a className='list--item'>Contact</a></Link></li>
                    </ul>
                </div>
                <div className='author'>
                    <p>© Iris Huy</p>
                </div>
            </Fragment>
        )
    }
}
export default Menu;
// export {default} HamburgerMenu;