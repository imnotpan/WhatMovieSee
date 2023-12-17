import React from "react";
import { 
    ImageBackground, 
    StyleSheet, 
    Text, 
    View, 
} from "react-native";


const Card = (props: {
    movie: { name: any; image: any; description: any; }; 
}) => {
    const {name, image, description} = props.movie




    return (
        <View style = {styles.card}>
            <ImageBackground source = {{uri: image}} style={styles.image}>
                <View style = {styles.cardInner}> 
                    <Text style = {styles.name}> {name} </Text>
                    <Text style = {styles.description}> {description} </Text>
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
    name: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
    },
    description: {
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
