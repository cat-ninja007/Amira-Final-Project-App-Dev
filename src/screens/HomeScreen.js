import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {bookCategory} from '../../Data/BookCategory';
import {useNavigation} from '@react-navigation/native';

const categories = [
  'History',
  'English Literature',
  'Indonesian Literature',
  'Fantasy',
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPressed = category => {
    navigation.navigate('BookList', {category});
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subtitleBox}>
        {/* <Text style={styles.subtitle}>Pick A Card!</Text> */}
        <Text style={{fontFamily: 'PlayfairDisplay-Bold', fontSize: 30}}>
          Pick A Card!
        </Text>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Each Card Contains Different Genre
        </Text>
      </View>
      {/* <FlatList
        data={bookCategory}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={
                () =>
                  // navigation.navigate('BookList', {chosenGenre: item.category})
                  navigation.navigate('BookList', item.category)
                // console.log('clicked', item.category)
              }>
              //pass chosen genre
              <View style={styles.cardContainer}>
                <Text style={styles.card}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        key={2}
      /> */}

      {/* <View style={styles.gridContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={handleCategoryPressed(category)}
            style={styles.card}>
            <Text style={styles.text}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View> */}

      <View style={styles.gridContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.card}
            onPress={() => handleCategoryPressed(category)}>
            <Text
              style={[
                styles.cardText && {
                  fontFamily: 'SourGummy-SemiBold',
                  color: 'white',
                  fontSize: 17,
                },
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  subtitleBox: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  descriptionBox: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  flatlistContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'blue',
    margin: 15,
    width: 170,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // card: {
  //   width: 170,
  //   height: 200,
  //   backgroundColor: 'blue',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: 5,
  //   borderColor: 'black',
  //   borderWidth: 2,
  // },
  // gridContainer: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   gap: 10,
  // },
  // text: {
  //   color: 'white',
  //   fontSize: 30,
  //   padding: 10,
  //   textAlign: 'center',
  // },
  card: {
    width: 170,
    height: 200,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  cardText: {
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
});
