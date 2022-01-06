import React, {useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from 'axios';

const CharacterDetails = ({route}) => {

    const [characterName, setCharacterName] = useState('');

    //https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=

    useEffect(() => {
        getCharacter();
        //console.log(route.params.id);
        //console.log('state -> ' + character);
    }, [])

    const getCharacter = () => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${route.params.id}?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703`).
        then((res)=>{
            console.log(res.data.data.results[0].id);
            //console.log(res.data.data.results);
            setCharacterName(res.data.data.results[0].name)
        });
    }

    return (
        <View> 
            <Text>{characterName} Details</Text>
        </View>
    )
}

export default CharacterDetails;
