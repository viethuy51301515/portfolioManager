import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import './achivement.scss'
import Title from '../title_header';
const img = require('../../image/html.png');
const Achivement = (props) =>{
    var data = useSelector(state => state.getInforReducer);
    const [fliped,setFliped] = useState(false);
    const [op,setOpacity] = useState([]);
    var items = [];
    console.log('123');
    var classN = `achivement-img ${fliped ? 'achivement-img--fliped' : ''}`;
    var classM = `achivement-item ${fliped? 'achivement-img--fliped' : ''}`;
    if(data.achivement){
        data.achivement.forEach( (element,index) => {
            items.push(
                <div>
                    <section className={classM}>
                            <div className='achivement-item__info'>    
                                <article>
                                    <p>{element.title}</p>
                                    <p>{element.name}</p>
                                    <a style={ op.findIndex(item => item == index) == -1 ? {opacity:1,transition:'0.5s all ease',lineHeight: '1.2em'} : {opacity:0,transition:'0.5s all ease',lineHeight: '1.2em'}} onClick={()=>{setOpacity([index,...op])}}>..more...</a>
            <p style={ op.findIndex(item => item == index) == -1 ? {opacity:0,transition:'1s all ease',lineHeight: '1.2em'} : {opacity:1,transition:'1s all ease',lineHeight: '1.2em'}}> {element.des}</p>
                                </article>
                                <article>
                                    <div>
                                        <span style={{color:'5fcf80'}} className='icon-checkmark-circle'></span>
                                        <aside>
                                            <p>Achieved</p>
                                            <span>{element.date}</span>
                                        </aside>
                                    </div>
                                    <div>
                                        <a href={element.link} target='_blank'>Check ceftification</a>
                                    </div>
                                </article>
                        
    
                            </div>
                            <div className='achivement-item__img'>
                                <figure>
                                    <img src={element.img}></img>
                                </figure>   
                            </div>
                    </section>
                    <div className={classN}>
                        
                    </div>
                </div>
            )
        })
    }

    return(
        <div className='main-page'>
            <Title title='Achivement'></Title>
            <div className='achivement-grid'>
                {items}
                
            </div>
        </div>
    )
}
export default Achivement;