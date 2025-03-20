import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CommonScreen = () => {

    const defaultImage = require('../assets/images/defaultImage.png');

    return (
        <View style={styles.container}>
         
            
            {/* Image Centered */}
            <View style={styles.imageWrapper}>
                <Image 
                    source={defaultImage}
                    style={styles.image}
                    resizeMode="contain"
                />
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
        marginTop:10
    },
    image: {
        width: '200%',
        height: '200%',
        marginVertical:'auto'
        
    }
});
