
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Card from './src/Components/Card';
import movies from './src/data/MoviesFetch';
import Animated ,{ 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  useDerivedValue,
  interpolate,
  runOnJS
} from 'react-native-reanimated'
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Movies from "./src/data/MoviesFetch";

const SWIPE_VELOCITY = 800;

function App(): React.JSX.Element {
  const { movies, loadingMovies} = Movies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentMovie = movies[currentIndex];
  const nextMovie = movies[nextIndex];

  const {width: screenWidth} = useWindowDimensions();
  const prevPositionX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const hiddenTranslateX = 2 * screenWidth;
  const rotate = useDerivedValue( () => interpolate(
      offsetX.value,
      [0, hiddenTranslateX],
      [0, 60],
  ) + 'deg' );


  const cardAnimated = useAnimatedStyle(() => {
    return {
      transform: [{
          translateX: offsetX.value,
      },
      {
          rotate: rotate.value,
      },
      ],
    }});

  const nextCardAnimated = useAnimatedStyle(() => ({
    transform: [
     { scale: interpolate(offsetX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.9, 1]) }
    ],
    opacity: interpolate(offsetX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8, 1])
  }))
  
  const dragGesture = Gesture.Pan()
      .onBegin(() => {
          prevPositionX.value = offsetX.value;
      })
      .onUpdate((event) => {
          const newPosition = event.translationX + prevPositionX.value;
          offsetX.value = newPosition
      })
      .onEnd((event) => {
          if (Math.abs(event.velocityX) < SWIPE_VELOCITY){
            offsetX.value = withSpring(0);
            return;
          };
          offsetX.value = withSpring(hiddenTranslateX * Math.sign(event.velocityX));
          runOnJS(setCurrentIndex)(currentIndex+1);
      })
    
  useEffect(() => {
    offsetX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex]);

  return (
    <GestureHandlerRootView style= {styles.pageContainer}>
      {nextMovie && (
        <View style= {styles.nextCardContainer}>
          <Animated.View  style = {[nextCardAnimated, styles.animatedCard]} >
            <Card movie = {nextMovie}></Card>
          </Animated.View>
        </View>
      )}
      
      {currentMovie && (
        <Animated.View style = {[cardAnimated, styles.animatedCard]}> 
          <GestureDetector gesture={dragGesture}>
            <Card movie = {currentMovie}></Card>
          </GestureDetector>
        </Animated.View >
      )}
    </GestureHandlerRootView>

  );
}

const styles =  StyleSheet.create({
  pageContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1 
  },
  animatedCard: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  
})

export default App;
