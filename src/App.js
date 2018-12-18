import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bottom: "0",
      top: '',
      waiting: false,
      operator:'',
      firstnumber:''
    }
  }
  
  showNumber(digit){
    const {bottom, waiting, firstnumber, operator} = this.state;
    if(waiting){
      this.setState({
        bottom:digit,
        waiting: false,
        firstnumber: bottom,
      })
    } else {
      this.setState({
        bottom: bottom === '0'? digit: bottom+digit,
      })
    }
  }

  operator=(op)=>{
    const {bottom, top, waiting, operator} = this.state;
    this.setState({
      waiting:true,
      operator: op,
      top:top+bottom+op
    })  
  }

  performCaculate=()=>{
    const{bottom, operator, firstnumber} = this.state;
    let result = '';
    const operation = {
      '+': (prenumber, nextnumber) => prenumber+nextnumber,
      '-': (prenumber, nextnumber) => prenumber-nextnumber,
      'X': (prenumber, nextnumber) => prenumber*nextnumber,
      '/': (prenumber, nextnumber) => prenumber/nextnumber,
    }
    if(operator){
      this.setState({
        bottom: String(operation[operator](parseFloat(firstnumber), parseFloat(bottom))),
        operator:'',
        firstnumber:''
      })
    }
  }

  decimal=()=>{
    const {bottom, waiting, firstnumber} = this.state;
    if(waiting){
      this.setState({
        bottom:'.',
        waiting: false,
        firstnumber: bottom
      })
    } else {
      if(bottom.indexOf('.')===-1){
        this.setState({
          bottom: bottom+'.'
        })
      }
    }
  }

  toggle=()=>{
    const {bottom} = this.state;
    this.setState({
      bottom: bottom.charAt(0)==='-'?bottom.substr(1):bottom.charAt(0) === '0'
      && bottom.length < 3? bottom : '-'+bottom
    })
  }

  delete = () => {
    let number = '0';
    if((this.state.bottom).length === 1 && this.state.bottom === "0"){
      number = '0';
    } else if((this.state.bottom).length === 1 && this.state.bottom !== "0"){
      number = '0';
    }else {
      number = this.state.bottom.slice(0,-1);
    }
    this.setState({
      bottom: number,
      top: number
    })
  }  

  clear = (event) => {
    this.setState({
      bottom: '0',
      top: '',
      operator: '',
      waiting: false,
      firstnumber: ''
    })
  }

  percent = () =>{
    const {bottom} = this.state;
    let value = parseFloat(bottom);
    this.setState({
      bottom: String(value/100)
    })
  }


  render() {
    const {bottom, top} = this.state;
    return (
      <div className="container">
        <div className="display1"><Topdisplay numbers={this.state} ></Topdisplay></div>
        <div className="display2"><span>{bottom}</span></div>
        <button className='btn-button' id='clear' onClick={this.clear}>AC</button>
        <button className='btn-button' onClick={this.toggle}>+/-</button>
        <button className='btn-button' onClick={this.percent}>%</button>
        <button className='btn-button' id='divide' onClick={()=>{this.operator('/')}}>/</button>
        <button className='btn-button' id='seven' onClick={()=>this.showNumber('7')}>7</button>
        <button className='btn-button' id='eight' onClick={()=>this.showNumber('8')}>8</button>
        <button className='btn-button' id='nine' onClick={()=>this.showNumber('9')}>9</button>
        <button className='btn-button' id='multiply' onClick={()=>{this.operator('X')}}>X</button>
        <button className='btn-button' id='four' onClick={()=>this.showNumber('4')}>4</button>
        <button className='btn-button' id='five' onClick={()=>this.showNumber('5')}>5</button>
        <button className='btn-button' id='six' onClick={()=>this.showNumber('6')}>6</button>
        <button className='btn-button' id='substract' onClick={()=>{this.operator('-')}}>-</button>
        <button className='btn-button' id='one' onClick={()=>this.showNumber('1')}>1</button>
        <button className='btn-button' id='two' onClick={()=>this.showNumber('2')}>2</button>
        <button className='btn-button' id='three' onClick={()=>this.showNumber('3')}>3</button>
        <button className='btn-button' id='add' onClick={()=>{this.operator('+')}}>+</button>
        <button className='btn-button zero' id='zero' onClick={()=>this.showNumber('0')}>0</button>
        <button className='btn-button' id='decimal' onClick={this.decimal}>.</button>
        <button className='btn-button' id='equals' onClick={this.performCaculate}>=</button>
        <div><span>
          <pre>
            {JSON.stringify(this.state,null,1)}
          </pre>
          </span></div>
    </div>
    );
  }
}

class Topdisplay extends Component{
  constructor(){
    super();
  }
  render(){
    const {top} = this.props.numbers;
    return(
      <span>{top}</span>
    );
  }
}

export default App;
