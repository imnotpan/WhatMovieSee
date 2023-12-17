import React from "react";
import { 
    ImageBackground, 
    StyleSheet, 
    Text, 
    View, 
} from "react-native";


const Card = (props: {
    movie: { title: any; poster_path: any; overview: any; }; 
}) => {
    const {title, poster_path, overview} = props.movie
    
    return (
        <View style = {styles.card}>
            <ImageBackground source = {{uri: poster_path}} style={styles.image}>
                <View style = {styles.cardInner}> 
                    <Text style = {styles.title}> {title} </Text>
                    <Text style = {styles.overview}> {overview} </Text>
                </View>
            </ImageBackground>
        </View>
    )
} 

const styles =  StyleSheet.create({
    image: {
      width: '100%', 
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    title: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
    },
    overview: {
      fontSize: 10, 
      color :'white',
      lineHeight: 24,
    },
    cardInner: {
        padding: 10,
    },
    card: {
        width: '95%',
        height: '65%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
      },
  })
export default Card;
