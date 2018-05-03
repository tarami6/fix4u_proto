import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Animation from 'lottie-react-native';
import anim from '../../assets/animations/servishero_loading.json';

export default class LoadingComponent extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*{this.props.title ?*/}
                    {/*<Text>{this.props.title}</Text> :*/}
                    {/*<Image*/}
                        {/*style={styles.logo}*/}
                        {/*source={require('../../assets/images/logoPiso.jpg')}*/}
                    {/*/>}*/}
                <Animation
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 140,
                        height: 140
                    }}
                    loop={true}
                    source={anim}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
    }
});