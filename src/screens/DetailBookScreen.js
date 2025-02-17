import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import realm from '../database/realm';

const DetailBookScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {title, id, author, rating, page, category} = route.params;

  const handleBookMark = () => {
    realm.write(() => {
      const currentBook = realm.objectForPrimaryKey('Book', id);
      if (!currentBook) {
        realm.create('Book', {title, id, author, rating, page, category});
        alert('Success!');
      } else {
        alert('info', 'This book is already in ur bookmark');
      }
    });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.imgContainer}>
        <View style={styles.bookImg}>
          <Text>Book Image</Text>
        </View>
      </View>
      <View style={styles.bookInfo}>
        <Text>Title: {title}</Text>
        <Text>Author: {author}</Text>
        <Text>Page: {page}</Text>
        <Text>Category: {category}</Text>
        <Text>Rating: {rating}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleBookMark();
        }}>
        <Text>Add to Bookmark</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailBookScreen;

const styles = StyleSheet.create({
  bookImg: {
    width: 200,
    height: 250,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    borderWidth: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
});
