import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {bookCategory} from '../../Data/BookCategory';

const HomeScreen = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subtitleBox}>
        <Text style={styles.subtitle}>Pick A Card!</Text>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Each Card Contains Different Genre
        </Text>
      </View>
      <FlatList
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
      />

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('BookList', setCategory('History'))}>
        //pass chosen genre
        <View style={styles.cardContainer}>
          <Text style={styles.card}>History</Text>
        </View>
      </TouchableOpacity> */}
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
  },
  descriptionBox: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 20,
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
  card: {
    color: 'white',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
  },
});
