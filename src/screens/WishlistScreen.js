import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import realm from '../database/realm';

const WishlistScreen = () => {
  const [bookmark, setBookmark] = useState([]);

  const loadingBookMark = () => {
    const bookSaved = realm.objects('Book');
    setBookmark(Array.from(bookSaved));
  };

  useEffect(() => {
    loadingBookMark();
    const updateBookMark = () => {
      loadingBookMark();
    };
    realm.addListener('change', updateBookMark);
    return () => realm.removeListener('change', updateBookMark);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Bookmark</Text>
      </View>
      {bookmark.length > 0 ? (
        <FlatList
          data={bookmark}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              //get data based on user's bookmark
              <View style={styles.bookContainer}>
                <View style={styles.bookImageContainer}>
                  {/* <Image style={styles.bookImage} source={{uri: item.imageLink}}/> */}
                  <Text style={styles.bookImage}>Book Image</Text>
                </View>

                <View style={styles.bookInfoContainer}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                  <Text style={styles.pages}>Page: {item.pages}</Text>
                  <TouchableOpacity style={styles.seeDetailButton}>
                    <Text style={styles.seeDetail}>See Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>No bookmarks</Text>
      )}
    </View>
  );
};

export default WishlistScreen;

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
