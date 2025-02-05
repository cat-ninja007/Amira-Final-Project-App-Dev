import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {books} from '../../Data/BookList';
import {bookCategory} from '../../Data/BookCategory';

const BookListScreen = props => {
  const {route} = props;
  // const category = route.params.chosenGenre;
  const {category} = route.params;
  // const filterBook = books.filter(book => book.genre === category);

  useEffect(() => {
    console.log('category clicked', category);
  }, [category]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{category}</Text> //based on chosen genre
      </View>
      <FlatList
        data={books}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            //get data from BookList.js
            <View style={styles.bookContainer}>
              <View style={styles.bookImageContainer}>
                {/* <Image style={styles.bookImage} source={{uri: item.imageLink}}/> */}
                <Text style={styles.bookImage}>Book Image</Text>
              </View>

              <View style={styles.bookInfoContainer}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.author}>Author: {item.author}</Text>
                <Text style={styles.pages}>Page: {item.page}</Text>
                <TouchableOpacity
                  style={styles.seeDetailButton}
                  onPress={() => navigation.navigate('DetailScreen')}>
                  <Text style={styles.seeDetail}>See Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  headerContainer: {
    backgroundColor: 'darkblue',
    padding: 15,
  },
  header: {
    color: 'white',
    fontSize: 20,
  },
  flatListContainer: {
    padding: 8,
  },
  bookContainer: {
    borderColor: 'darkblue',
    borderWidth: 2,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
  },
  bookImageContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  bookInfoContainer: {
    // borderColor: 'black',
    // borderWidth: 2,
    backgroundColor: 'darkblue',
    padding: 8,
    width: '70%',
  },
  title: {
    color: 'white',
  },
  author: {
    color: 'white',
  },
  pages: {
    color: 'white',
  },
  seeDetail: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});
