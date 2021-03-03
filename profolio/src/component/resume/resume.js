import React from 'react';
import Title from '../title_header';
import './resume.scss';
import {useEffect} from "react";
import {useSelector} from 'react-redux';
import marked from 'marked'
const Header = (props) =>{
    return(
        <div className='resume-smallheader'>
            <span className="icon-lunchbox"></span>
            <h1>{props.title}</h1>
        </div>
    )
}
var skills =[];
var workings = [];
var educations = [];
const Resume  = (props) =>{
    const data = useSelector(state => state.getInforReducer);
    console.log(data);
    skills = [];

    if(data.skill){
        data.skill.forEach(element => {
                    skills.push(
                        <div className='process'>
                        <h2 className='process-tilte'>
                            {element.name}
                        </h2>
                        <div className='process-inner'>
                            <div className='process-percentange'>{element.value}</div>
                            <div className='process-container'>
                                <span style={{width:element.value+'%'}}></span>
                            </div>
                        </div>
        
                    </div>
                    )
                });
    }

    workings = [];
    educations = [];
    if(data.experience){
        data.experience.forEach(element => {
            let content = marked(element.description.split("\\n").join('\n'))
            console.log(content);
            if(element.type =='exp'){
                workings.push(
                    <div className='working-item'>
                        <aside className='time'>
                            <h1>{element.year}</h1>
                        </aside>
                        <article className='working-des'>
                            <h1>{element.position}</h1>
                            <h3>{element.company}</h3>
                            <div className='working-des__content' dangerouslySetInnerHTML={{__html:content}} />
                        </article>
                    </div>
                )
            }
            else if(element.type =='edu'){
                educations.push(
                    <div className='working-item'>
                        <aside className='time'>
                            <h1>{element.year}</h1>
                        </aside>
                        <article className='working-des'>
                            <h1>{element.position}</h1>
                            <h3>{element.company}</h3>
                            <div className='working-des__content' dangerouslySetInnerHTML={{__html:content}} />
                        </article>
                    </div>
                )
            }
        }
        )
    }
    return(
        <div className='main-page resume'>
            <Title title='my skills'></Title>
            <section className='skills'>
                {skills}
            </section>
            <Title title='resume'></Title>
            <Header title='working experience'/>
            <section className='working'>
                {workings}
            </section>
            <Header title='education'/>
            <section className='working'>
                {educations}
            </section>
        </div>
    )
}
export default Resume;