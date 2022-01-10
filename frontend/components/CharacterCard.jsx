import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const CharacterCard = ({charac, navigation}) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.img}
                source={{uri: `${charac.thumbnail.path}.${charac.thumbnail.extension}`}}
                resizeMode='contain'
            />
            <Text style={styles.text}>{charac.name}</Text>
            
            <TouchableOpacity
                style={styles.button}
                onPress={()=> navigation.navigate('CharacterDetails',{id: charac.id})}>
                <Text style={styles.btnText}>See details</Text>
            </TouchableOpacity>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        marginTop: 30,
        padding: 5
    },
    img: {
        width: 150,
        height: 150,
    },
    text:{
        color: '#ffffff',
        fontSize: 20
    },
    btnText:{
        color: '#ffffff',
        fontSize: 20
    },
    button:{

    }
})

export default CharacterCard;
