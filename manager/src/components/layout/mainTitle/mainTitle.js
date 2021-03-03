import React from 'react'
import './mainTitle.scss'
class MainTitle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='main-title'>
                <h2>
                    {this.props.title}
                </h2>
                
            </div>
        )
    }
}
export default MainTitle;