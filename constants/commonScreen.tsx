import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CommonScreen = () => {

    const defaultImage = require('../assets/images/DefaultGif.gif');

    return (
        <View style={styles.container}>
         
            
            {/* Image Centered */}
            <View style={styles.imageWrapper}>
                <Image 
                    source={defaultImage}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Ugh!! Look like You didn't have any activities Yet</Text>
            </View>
        </View>
    );
};

export default CommonScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
        backgroundColor: '#f0f0f0'
    },
   
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        marginTop:20
    },
    image: {
        width: '100%',
        height: '100%',
        marginVertical:'auto'
        
    },
    text:{
        textAlign:'center',
        fontFamily:'san-serif',
        fontSize:25,
        fontWeight:'bold'
    }
});
