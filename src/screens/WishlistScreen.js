import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import realm from '../database/realm';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const WishlistScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [bookmark, setBookmark] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const loadingBookMark = () => {
    const bookSaved = realm.objects('Book');
    setBookmark(Array.from(bookSaved));
  };

  const setCheckBox = (id, status) => {
    const checkedBook = bookmark.map(item => {
      if (item.id === id) {
        item.checkedStatus = !status;
      }
      return item;
    });
    setBookmark(checkedBook);
  };

  useEffect(() => {
    const wishlistPage = navigation.addListener('focus', () => {
      const bookSaved = realm.objects('Book');
      const checkedBook = bookSaved.map(item => {
        item.checkedStatus = false;
        return item;
      });
      console.log(checkedBook);
      setBookmark(checkedBook);
    });
    return wishlistPage;
  }, []);

  useEffect(() => {
    loadingBookMark();
    const updateBookMark = () => {
      loadingBookMark();
    };
    realm.addListener('change', updateBookMark);
    return () => realm.removeListener('change', updateBookMark);
  }, []);

  useEffect(() => {
    // const saveBook = realm.objects('Book');
    // saveBook.map(book => {
    //   console.log(book.bookImage);
    // });
    // console.log(saveBook);
    console.log(bookmark);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Bookmark</Text>
      </View>

      {bookmark.length !== 0 ? (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEdit(!isEdit)}>
          {isEdit ? (
            <Text style={{color: 'white'}}>Cancel</Text>
          ) : (
            <Text style={{color: 'white'}}>Edit</Text>
          )}
        </TouchableOpacity>
      ) : null}

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
                  {/* <Text style={styles.bookImage}>Book Image</Text> */}
                  <Image
                    style={styles.bookImage}
                    source={{
                      uri: item.bookImage,
                    }}
                  />
                </View>

                <View style={styles.bookInfoContainer}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                  <Text style={styles.pages}>Page: {item.page}</Text>
                  <TouchableOpacity style={styles.seeDetailButton}>
                    <Text style={styles.seeDetail}>See Details</Text>
                  </TouchableOpacity>
                  {isEdit ? (
                    <CheckBox
                      size={20}
                      containerStyle={styles.checkbox}
                      onPress={() => setCheckBox(item.id, item.checkedStatus)}
                      checked={item.checkedStatus}
                    />
                  ) : null}
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>No bookmarks</Text>
      )}

      {isEdit ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeBook()}>
          <Icon name="delete" type="antdesign" size={20} color="white" />
        </TouchableOpacity>
      ) : null}
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
  bookImage: {
    borderWidth: 2,
    borderColor: 'darkblue',
    borderRadius: 5,
    marginBottom: 10,
    width: 100,
    height: 150,
  },
  checkbox: {
    paddingRight: 0,
    paddingLeft: 0,
    left: 200,
    marginLeft: 5,
  },
  editButton: {
    position: 'absolute',
    padding: 20,
    right: 8,
  },
});
