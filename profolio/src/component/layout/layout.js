import React from 'react';
import './layout.scss'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from '../home';
import About from '../about';
import Achivement from '../achivement';
import Contact from '../contact';
import Portfolios from '../portfolios';
import Resume from '../resume';
import Menu from '../menu';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getInfor} from '../../action';
import axios from 'axios'
const Layout = (props) => {
    const dispatch = useDispatch();
    useEffect( async ()=>{
        dispatch(getInfor());
    },[])
    return(
        <div className='layout'>
            <BrowserRouter>
                <section className='menu'>
                    <Menu></Menu>
                </section>
                {/* <HamburgerMenu/> */}
                <section className='main'>
                    <div className='main__grid'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                        <Route path='/portfolio' exact component={Home}></Route>
                        <Route path='/' exact component={Home}></Route>
                    <div className='page'>
                        
                        <Route path='/about' exact component={About}></Route>
                        <Route path='/achivement' exact component={Achivement}></Route>
                        <Route path='/contact' exact component={Contact}></Route>
                        <Route path='/portfolios' exact component={Portfolios}></Route>
                        <Route path='/resume' exact component={Resume}></Route>
                    </div>
                    

                </section>
            </BrowserRouter>
        </div>
    )
}
export default Layout;
