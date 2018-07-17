import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Word from './Word';

class App extends Component {
  constructor(props) {
    super(props)
    this.originalStr = "sometext10test1WHATEtest2test3test4test5test6"; //TODO: Remove once original string can be parsed
    
    this.state = {
      originalStr: "",
      parsedStr: "",
      isSubmitted: false
    }
  }

  handleChange = (e) => {
    this.setState({
      originalStr: e.target.value
    });
  }

  handleSumbit = (e) =>  {
    e.preventDefault();
    
    fetch('/res.json', {
      method: 'GET'
    }).then(res => {
      return res.json();
    }).then( data => {
      this.setState( {
        parsedStr: data,
        isSubmitted: true
      });
    })
    /*.then( e => {
      console.log("original text: ", this.state.originalStr);
      console.log("parsed text: ", this.state.parsedStr);
    })
    */
    .catch( err => {
      console.log("Error in fetching data: ", err)
    });    
  }


  render() {
    const isSubmitted = this.state.isSubmitted;
    const parsedTextArray = this.state.parsedStr.text;
    const originalStr = this.originalStr; //TODO: Change to this.state.originalStr
    let parsedText;

    if (isSubmitted) {
      let parseText = () => {
        let index = [0];
        
        let temp = parsedTextArray.map((o, k) => {
          index.push(o.beginOffset + o.word.length);
          return <Word key={o.beginOffset} wordObject={o} originalStr={originalStr} index={index[k]} />;
        });
        
        return ( 
          <div>
            {temp} 
            <span>{originalStr.substring(index[index.length-1], originalStr.length)}</span>
          </div>
        );
      }

      parsedText = parseText();
    } else {
      parsedText = <p> ...waiting for input </p>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SWIFT Parsing | V1 </h1>
        </header>
        <div className="left-half">
          <h2>Enter original SWIFT here</h2>
          <form onSubmit={this.handleSumbit }>
            <textarea name="rawSwift" id="rawSwift" style={{width: '100%', height: '100%'}} onChange={this.handleChange}/>
            <input type="submit" value="Submit" style={{align: 'center', margin: 'auto', display: 'block'}} />
          </form>
        </div>
        <div className="right-half">
          <h2>Read Parsed SWIFT here</h2>
          { parsedText }
        </div>
        
      </div>      
    );
  }
}



export default App;
