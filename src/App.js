import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      top: '',
      bottom: "0",
      operator:'',
      waiting: false,
      firstnumber:'',
      equalsign: false
    }
    this.operation = {
      '+': (prenumber, nextnumber) => prenumber+nextnumber,
      '-': (prenumber, nextnumber) => prenumber-nextnumber,
      '×': (prenumber, nextnumber) => prenumber*nextnumber,
      '÷': (prenumber, nextnumber) => prenumber/nextnumber,
    }
  }
  
  showNumber(digit){
    const {bottom, waiting, equalsign} = this.state;
    if(waiting){
      this.setState({
        bottom:digit,
        waiting: false,
        firstnumber: bottom,
      })
    } else if(digit==='0' && equalsign === true){
      this.setState({
        bottom: digit
      })
    } else {
      this.setState({
        bottom: bottom === '0'? digit: bottom+digit,
      })
    }
  }

  operator=(op)=>{
    const {bottom, top, operator, firstnumber, waiting} = this.state;
    //bottom value, if no operator, equal bottom, otherwise perform caculation
    let result = ''; 
    if(operator!==''){
      result = String(this.operation[operator](parseFloat(firstnumber), parseFloat(bottom)))
    } else {
      result = bottom;
    }
    //if change operator, only update operater
    if(waiting === true){
      this.setState({
        operator: op,
        top:top.slice(0,-1)+op
      })
    } else {
      this.setState({
        waiting:true,
        operator: op,
        top:top+bottom+op, 
        bottom: result,
        equalsign: false
      })  
    }
  }

  //equal sign clicked
  performCaculate=()=>{
    const{bottom, operator, firstnumber} = this.state;
    if(operator){
      this.setState({
        bottom: String(this.operation[operator](parseFloat(firstnumber), parseFloat(bottom))),
        operator:'',
        firstnumber:'',
        top: '',
        equalsign: true
      })
    }
  }

  decimal=()=>{
    const {bottom, waiting} = this.state;
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
        <div className='display1'>
        <AutoShrinkText>{top}</AutoShrinkText>
        </div>
        <div className='display2'>
          <AutoShrinkText>{bottom}</AutoShrinkText>
        </div>
        <button className='btn-button' id='clear' onClick={this.clear}>AC</button>
        <button className='btn-button' onClick={this.toggle}>+/-</button>
        <button className='btn-button' onClick={this.percent}>%</button>
        <button className='btn-button operator' id='divide' onClick={()=>{this.operator('÷')}}>÷</button>
        <button className='btn-button' id='seven' onClick={()=>this.showNumber('7')}>7</button>
        <button className='btn-button' id='eight' onClick={()=>this.showNumber('8')}>8</button>
        <button className='btn-button' id='nine' onClick={()=>this.showNumber('9')}>9</button>
        <button className='btn-button operator' id='multiply' onClick={()=>{this.operator('×')}}>×</button>
        <button className='btn-button' id='four' onClick={()=>this.showNumber('4')}>4</button>
        <button className='btn-button' id='five' onClick={()=>this.showNumber('5')}>5</button>
        <button className='btn-button' id='six' onClick={()=>this.showNumber('6')}>6</button>
        <button className='btn-button operator' id='substract' onClick={()=>{this.operator('-')}}>-</button>
        <button className='btn-button' id='one' onClick={()=>this.showNumber('1')}>1</button>
        <button className='btn-button' id='two' onClick={()=>this.showNumber('2')}>2</button>
        <button className='btn-button' id='three' onClick={()=>this.showNumber('3')}>3</button>
        <button className='btn-button operator' id='add' onClick={()=>{this.operator('+')}}>+</button>
        <button className='btn-button zero' id='zero' onClick={()=>this.showNumber('0')}>0</button>
        <button className='btn-button' id='decimal' onClick={this.decimal}>.</button>
        <button className='btn-button operator' id='equals' onClick={this.performCaculate}>=</button>
     {/*    <div>
          <span>
          <pre>
            {JSON.stringify(this.state,null,1)}
          </pre>
          </span>
        </div> */}
    </div>
    );
  }
}
class Topdisplay extends Component{
  render(){
    return (
      <span 
      {...this.props}/>
      )
  }
}

class AutoShrinkText extends Component{
    state = {
      proportion: 1
    }

  componentDidUpdate(){
    const {proportion} = this.state;
    const actualWidth = this.element.offsetWidth;
    const parentWidth = this.element.parentNode.offsetWidth;
    console.log(this.element);
    console.log(actualWidth, parentWidth);
    const actualProportion = parentWidth/actualWidth;
    if(actualProportion === proportion)
    return

    if(actualProportion < 1){
      this.setState({proportion: actualProportion})
    } else if (proportion < 1){
      this.setState({proportion: 1})
    }
  }

  render(){
    const {proportion} = this.state;
    const style = {
      transform: `scale(${proportion})`,
      transformOrigin: 'left'
    }
    //props can be classname or pros from parent
    return(
      <span 
      {...this.props} 
      style={style} 
      ref={(element)=>(this.element = element)}/>
      ) 
  };
}

export default App;

