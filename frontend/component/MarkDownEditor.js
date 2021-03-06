/**
 * Created by pengyao on 16/5/29.
 */
import React from "react";
import Codemirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import 'codemirror/mode/gfm/gfm';
import "../lib/style.css"

export default class MarkDownEditor extends React.Component{

    render(){
        return (
            <Codemirror value={this.props.value} options={{
                mode: 'gfm',
                lineNumbers:false,
                theme:"default",
                viewportMargin:Infinity
            }} onChange={(value)=>this.props.onChange({target:{value}})}/>
        )
    }
}