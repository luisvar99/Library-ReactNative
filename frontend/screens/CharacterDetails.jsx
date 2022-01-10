import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native'
import axios from 'axios';

const CharacterDetails = ({route}) => {

    const [characterName, setCharacterName] = useState('');
    const [characterComics, setCharacterComics] = useState([]);
    const [characterSeries, setCharacterSeries] = useState([]);
    const [showSeries, setShowSeries] = useState(false);
    const [showComics, setShowComics] = useState(false);

    //https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=

    //https://gateway.marvel.com:443/v1/public/characters/1011334/comics?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703


    useEffect(() => {
        getCharacter();
        getCharactersComics();
        getCharactersSeries();
        console.log(route.params.id);
    }, [])

    const getCharacter = () => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${route.params.id}?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703`).
        then((res)=>{
            setCharacterName(res.data.data.results[0].name);
        }).catch((err)=>{
            console.log('Error -> ' + err);
        });
    }

    const getCharactersComics = () => {
        axios.get('https://gateway.marvel.com:443/v1/public/characters/1011334/comics?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703')
        .then((res) => {
            setCharacterComics(res.data.data.results)
        });
    }

    const getCharactersSeries = () => {
        axios.get('https://gateway.marvel.com:443/v1/public/characters/1011334/events?ts=1&apikey=ddfe019b90251df5d29164692a47ffba&hash=9b42bc5e90000c4aab1ce2f97299a703')
        .then((res) => {
            setCharacterSeries(res.data.data.results)
            console.log('Character series -> ' + res.data.data.results);
        });
    }

    const renderComics=({item})=>(
        <View style={styles.comicContainer}>
            <Image
                style={styles.img}
                source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}}
                resizeMode='contain'
            />
            <Text style={styles.comicTitle}>{item.title}</Text>
            <Text style={styles.comicTitle}>{item.resourceURI}</Text>
        </View>
    )

    const renderSeries=({item})=>(
        <View style={styles.comicContainer}>
            <Image
                style={styles.img}
                source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}}
                resizeMode='contain'
            />
            <Text style={styles.comicTitle}>{item.title}</Text>
            <Text style={styles.comicTitle}>{item.resourceURI}</Text>
        </View>
    )

    const showComicsF = () =>{
        setShowComics(true)
        setShowSeries(false)
    }
    const showSeriesF = () =>{
        setShowSeries(true)
        setShowComics(false)
    }

    return (
        <View style={styles.container}> 
            <View style={styles.subContainer}>
                
                <Text style={styles.characterName}>{characterName}</Text>

                <View style={
                        {   flex:1, 
                            flexDirection:'row',
                            justifyContent:'space-around',
                            marginTop: 20,
                        }}>

                    <TouchableOpacity
                    /*  style={styles.comicsText}*/                    
                        onPress={showComicsF}
                    >
                        <Text style={styles.comicsText}>Comics</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity
                    /*  style={styles.comicsText}*/                    
                        onPress={showSeriesF}
                    >
                        <Text style={styles.comicsText}>Series</Text>

                    </TouchableOpacity>
                
                </View>
                
                { showComics && (
                    <FlatList
                        data={characterComics}
                        renderItem={renderComics}
                    />
                    ) 
                }
                { showSeries && (
                    <FlatList
                        data={characterSeries}
                        renderItem={renderSeries}
                    />
                    ) 
                }
                
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#222f3e',
        alignItems:'center',
    },
    comicContainer:{
        marginTop: 40,
        alignItems:'center',
        width:'95%'
    },
    comicTitle:{
        color:'#ffffff',
        fontSize:18,
        marginTop:5
    },
    characterName:{
        fontSize:30,
        color:'#ffffff',
        textAlign:'center'
    },
    comicsText:{
        fontSize:22,
        color:'#ffffff',
        marginTop: 10,
        marginBottom: 10,
        marginLeft:10
    },
    subContainer:{
        marginTop: 20,
        marginLeft:0
    },
    img:{
        width:250,
        height:250
    }
})

export default CharacterDetails;
