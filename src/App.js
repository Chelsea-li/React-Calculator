import React, { Component } from 'react';
import Numberbutton from './Numberbutton.js';

import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      before: "0",
      display: "0"
    }
    //this.showNumber = this.showNumber.bind(this);
   /*  this.delete = this.delete.bind(this);
    this.clear = this.clear.bind(this);
    this.minus = this.minus.bind(this);
    this.decimal = this.decimal.bind(this); */
  }

  showNumber = (event) => {
    let number = '0';
    if((this.state.display).length === 1 && this.state.display === "0"){
      number = this.state.display.replace('0',event.target.innerHTML);
    } else {
      number = this.state.before+event.target.innerHTML;
    }
    this.setState({
      display: number,
      before: number
    })
  }

  delete = () => {
    let number = '0';
    if((this.state.display).length === 1 && this.state.display === "0"){
      number = '0';
    } else if((this.state.display).length === 1 && this.state.display !== "0"){
      number = '0';
    }else {
      number = this.state.display.slice(0,-1);
    }
    this.setState({
      display: number,
      before: number
    })
  }  

  clear = (event) => {
    this.setState({
      display: '0',
      before: '0'
    })
  }

  minus = (event) => {
    let number = '0';
    if((this.state.display).charAt(0) === '-'){
      number = this.state.display.slice(1);
    } else {
      number = '-'+this.state.display;
    }
    this.setState({
      display: number,
      before: number
    })
  }

  decimal = (event) => {
    let number = '0';
    if(this.state.display.indexOf('.') === -1){
      number = this.state.before+event.target.innerHTML;
      this.setState({
        display: number,
        before: number
      })
    } 
  }

  getResult = () => {
    
  }

  //ids are no need to have here, but it's required by FCC
  render() {
    const {display, before} = this.state;
    return (
      <div className="container">
        <div className="display1"><span>{before}</span></div>
        <div className="display2"><span>{display}</span></div>
        <Numberbutton number={'AC'} clsname={'button'} ids={'clear'} handler={this.clear}/>
        <Numberbutton number={'+ / -'} clsname={'button'} ids={''} handler={this.minus}/>
        <Numberbutton number={'D'} clsname={'button'} ids={''} handler={this.delete}/>
        <Numberbutton number={'/'} clsname={'button'} ids={'divide'} handler={this.showNumber}/>
        <Numberbutton number={'7'} clsname={'button'} ids={'seven'} handler={this.showNumber}/>
        <Numberbutton number={'8'} clsname={'button'} ids={'eight'} handler={this.showNumber}/>
        <Numberbutton number={'9'} clsname={'button'} ids={'nine'} handler={this.showNumber}/>
        <Numberbutton number={'x'} clsname={'button'} ids={'multiply'} handler={this.showNumber}/>
        <Numberbutton number={'4'} clsname={'button'} ids={'four'} handler={this.showNumber}/>
        <Numberbutton number={'5'} clsname={'button'} ids={'five'} handler={this.showNumber}/>
        <Numberbutton number={'6'} clsname={'button'} ids={'six'} handler={this.showNumber}/>
        <Numberbutton number={'-'} clsname={'button'} ids={'substract'} handler={this.showNumber}/>   
        <Numberbutton number={'1'} clsname={'button'} ids={'one'} handler={this.showNumber}/>
        <Numberbutton number={'2'} clsname={'button'} ids={'two'} handler={this.showNumber}/>
        <Numberbutton number={'3'} clsname={'button'} ids={'three'} handler={this.showNumber}/>
        <Numberbutton number={'+'} clsname={'button'} ids={'add'} handler={this.showNumber}/>
        <Numberbutton number={'0'} clsname={'button zero'} ids={'zero'} handler={this.showNumber}/>
        <Numberbutton number={'.'} clsname={'button'} ids={'decimal'} handler={this.decimal}/>
        <Numberbutton number={'='} clsname={'button'} ids={'equals'} handler={this.getResult}/>
    </div>
    );
  }
}

export default App;
