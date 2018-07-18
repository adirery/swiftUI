import React, { Component } from 'react';

class Word extends Component {

    render() {
        return(
            <span>
                {this.props.originalStr.substring(this.props.index, this.props.wordObject.beginOffset)} <abbr title={this.props.wordObject.tag}> {this.props.wordObject.text} </abbr> 
            </span>
        );
    }
}

export default Word;