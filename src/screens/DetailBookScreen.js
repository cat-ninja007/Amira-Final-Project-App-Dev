import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import realm from '../database/realm';
import {ScrollView} from 'react-native';

const DetailBookScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {title, id, author, rating, page, category, description, bookImage} =
    route.params;

  const handleBookMark = () => {
    realm.write(() => {
      const currentBook = realm.objectForPrimaryKey('Book', id);
      if (!currentBook) {
        realm.create('Book', {
          title,
          id,
          author,
          rating,
          page,
          category,
          description,
          bookImage,
        });
        alert('Success!');
      } else {
        alert('This book is already in ur bookmark');
      }
    });
  };

  useEffect(() => {
    console.log('book image url:', bookImage);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'skyblue'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Book Details</Text>
      </View>
      <ScrollView>
        <View style={styles.imgContainer}>
          <View style={styles.bookImg}>
            {bookImage ? (
              <Image source={{uri: bookImage}} style={styles.bookImg} />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View>
          {/* <View style={styles.infoContainer}> */}
          <View style={styles.bookInfo}>
            <Text
              style={{
                fontFamily: 'SourGummy-SemiBold',
                fontSize: 15,
                textAlign: 'center',
              }}>
              {title}
            </Text>

            <Text style={{fontFamily: 'SourGummy-Regular'}}>
              Author: {author}
            </Text>
            <Text style={{fontFamily: 'SourGummy-Regular'}}>Page: {page}</Text>
            <Text style={{fontFamily: 'SourGummy-Regular'}}>
              Category: {category}
            </Text>
            <Text style={{fontFamily: 'SourGummy-Regular'}}>
              Rating: {rating}
            </Text>
            <Text style={{fontFamily: 'SourGummy-Regular'}}>
              Overview: {description}
            </Text>
          </View>
          {/* </View> */}
          {/* <View style={styles.buttonContainer}> */}
          <View style={styles.bookmarkContainer}>
            <TouchableOpacity
              onPress={() => {
                handleBookMark();
              }}
              style={styles.bookmark}>
              <Text>Add to Bookmark</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </ScrollView>
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
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    fontSize: 20,
    width: '80%',
    padding: 10,
    letterSpacing: 5,
  },
  bookmark: {
    textAlign: 'center',
  },
  bookmarkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 8,
    backgroundColor: 'lightblue',
    width: '50%',
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 10,
  },
  headerContainer: {
    backgroundColor: 'darkblue',
    padding: 15,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
  },
});
