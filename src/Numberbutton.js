import React, {Component} from 'react';
import './App.css';


class Numberbutton extends Component{
    render(){
        const {clsname, handler, number, ids} = this.props;
        return(
            <div className={clsname} id={ids} onClick={handler}>{number}</div>
        )
    }
}

export default Numberbutton;