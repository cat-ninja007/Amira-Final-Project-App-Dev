import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {books} from '../../Data/BookList';

const BookListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const category = route.params.chosenGenre;
  const {category} = route.params;
  const filterBook = books.filter(book => book.category === category);

  useEffect(() => {
    console.log('category clicked', category);
  }, [category]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{category}</Text>
      </View>
      {filterBook.length > 0 ? (
        <FlatList
          data={filterBook}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              //get data from BookList.js
              <View style={styles.bookContainer}>
                <View style={styles.bookImageContainer}>
                  <Image
                    style={styles.bookImage}
                    source={{
                      uri: item.bookImage,
                    }}
                  />
                  {/* <Text style={styles.bookImage}>{item.bookImage}</Text> */}
                </View>

                <View style={styles.bookInfoContainer}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                  <Text style={styles.pages}>Page: {item.page}</Text>
                  <TouchableOpacity
                    style={styles.seeDetailButton}
                    onPress={() => navigation.navigate('BookDetail', item)}>
                    <Text style={styles.seeDetail}>See Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>No books available in this category</Text>
      )}
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
    fontFamily: 'PlayfairDisplay-Bold',
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
    width: 100,
    height: 150,
  },
  bookImage: {
    borderWidth: 2,
    borderColor: 'darkblue',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: '100%',
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
    fontFamily: 'SourGummy-Regular',
  },
  author: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  pages: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  seeDetail: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontFamily: 'SourGummy-SemiBold',
  },
});
