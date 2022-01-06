import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard'

const Home = ({navigation}) => {
    
    const [characters, setCharacters] = useState([]);
    /* const [publicKey, setPublicKey] = useState('ddfe019b90251df5d29164692a47ffba')
    const [privatekey, setPrivatekey] = useState('510ac357c103dd0c496758914fba05cd8dd047c2')
    const [ts, setTs] = useState(1)
    const [hash, setHash] = useState('9b42bc5e90000c4aab1ce2f97299a703') */

    useEffect(() => {
        getAllCharacters();
    }, [])
    
    const getAllCharacters = () => {
        axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703')
        .then((res)=>{ 
            //console.log('RES.DATA ->'+ JSON.stringify(res.data));
            datac = (res.data.data.results);
            setCharacters(datac);
            //console.log('CHARACTERS ->'+ characters)
             
            /* characters.map((ch)=>{
                console.log(ch.id);  
            }) */
        }).catch((error)=>{
            console.log('error -> ' + error)
        })
        
        
    }

    const renderItem = ({item}) => {
        //console.log("character: " + item); 
        return <CharacterCard charac={item} navigation={navigation}/>
    }
 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Characters</Text>

            <FlatList
                style={{backgroundColor:'red'}}
                data={characters}
                //keyExtractor={(book)=> book.id + ''}
                renderItem={renderItem} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#222f3e",
        flex:1,
    },
    button:{
        backgroundColor: "red",
        padding: 7,
        width: "25%",
        borderRadius: 10
    },
    btnText: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 16
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 10,
        color:'#ffffff'
    }
})

export default Home;
