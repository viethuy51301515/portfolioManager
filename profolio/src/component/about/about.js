import React from 'react';
import Title from '../title_header';
import './about.scss';
import {useSelector,useDispatch} from 'react-redux' ;
var profileImage = require('../../image/hinhnen.jpg')

function About (props){
    const infor = useSelector(state => state.getInforReducer)
    console.log('123');
    const downLoadCv = ()=>{
        window.open(infor.user.cv);
    }
    return(
        <div className='about main-page'>
            <Title title='ABOUT ME'></Title>
            <section className='about-content'>
                <figure className='about-content__image'>
                    <img src={profileImage} />
                </figure>
                <article className='about-content__info'>
                    <h1>
                    I am <span>{infor.user && infor.user.name}</span>
                    </h1>
                    <p>
                        I am a web developer.With 2 years working as a web developer and front-end skills from self-studying such as React-Js.
                        I can provide clean code and pixel perfect design. I also make website more & more interactive with web animations.
                    </p>
                    <ul>
                        <li><b>Full Name</b>{infor.user && infor.user.name}</li>
                        <li><b>DOB</b>{infor.user && infor.user.dob}</li>
                        <li><b>Home Town</b>{infor.user && infor.user.hometown}</li>
                        <li><b>University</b>{infor.user && infor.user.university}</li>
                        <li><b>Location</b>{infor.user && infor.user.location}</li>
                    </ul>
                    <button onClick={()=>{downLoadCv()}}>Download CV</button>
                </article>
            </section>
        </div>
    )
}
export default About;