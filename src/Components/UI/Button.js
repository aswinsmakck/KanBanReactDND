import React from "react";

export default class Button extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render(){
        return (
            <button onClick = {this.props.onClick} style={this.props.style} className={this.props.styleName}>{this.props.children}</button>
        )
    }
}