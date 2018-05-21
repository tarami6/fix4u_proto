import React, {Component} from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../android/app/src/config.json';
const Icon = createIconSetFromFontello(fontelloConfig);



export default class CustomIcons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            size: this.props.size,
            color: this.props.color,
        }
    }
    render(){
        let name = this.state.name;
        let size = this.state.size;
        let color = this.state.color;
        return(
                <Icon name={name} size={size} color={color} />
        )
    }
}