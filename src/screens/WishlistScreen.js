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

  // ✅ Load only books that are actually bookmarked
  const loadingBookMark = () => {
    const bookSaved = realm.objects('Book').filtered('isBookmarked == true');
    setBookmark(Array.from(bookSaved)); // ✅ Update state
  };

  // ✅ Toggle checkbox state
  const setCheckBox = id => {
    const updatedBooks = bookmark.map(item =>
      item.id === id ? {...item, checkedStatus: !item.checkedStatus} : item,
    );

    setBookmark(updatedBooks); // ✅ Update only the checkbox state, not isBookmarked
  };

  // ✅ Remove checked books
  const removeBook = () => {
    let removed = false;

    realm.write(() => {
      bookmark.forEach(item => {
        if (item.checkedStatus) {
          // ✅ Only remove books that are checked
          const book = realm.objectForPrimaryKey('Book', item.id);
          if (book) {
            book.isBookmarked = false; // ✅ Unmark as bookmarked
            removed = true;
          }
        }
      });
    });

    if (removed) {
      alert('Successfully removed the selected book(s) from your wishlist!');
    }

    loadingBookMark(); // ✅ Refresh UI after removing books
    setIsEdit(false); // ✅ Hide delete button after removal
  };

  // ✅ Refresh when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadingBookMark();
    });

    return unsubscribe;
  }, [navigation]);

  // ✅ Listen for Realm database changes
  useEffect(() => {
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

      {bookmark.length !== 0 && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setIsEdit(!isEdit);

            if (!isEdit) {
              // ✅ Reset all checkboxes to unchecked when entering edit mode
              setBookmark(prevBookmarks =>
                prevBookmarks.map(book => ({...book, checkedStatus: false})),
              );
            }
          }}>
          <Text style={{color: 'white'}}>{isEdit ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      )}

      {bookmark.length > 0 ? (
        <FlatList
          data={bookmark}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.bookContainer}>
              <View style={styles.bookImageContainer}>
                <Image
                  style={styles.bookImage}
                  source={{uri: item.bookImage}}
                />
              </View>

              <View style={styles.bookInfoContainer}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.author}>Author: {item.author}</Text>
                <Text style={styles.pages}>Page: {item.page}</Text>
                <Text style={styles.rating}>Rating: {item.rating}</Text>
                <TouchableOpacity
                  style={styles.seeDetailButton}
                  onPress={() => {
                    navigation.navigate('BookDetail', {
                      id: item.id,
                      title: item.title,
                      author: item.author,
                      rating: item.rating,
                      page: item.page,
                      category: item.category,
                      description: item.description,
                      bookImage: item.bookImage,
                    });
                  }}>
                  <Text style={styles.seeDetail}>See Details</Text>
                </TouchableOpacity>

                {isEdit && (
                  <CheckBox
                    size={20}
                    containerStyle={styles.checkbox}
                    onPress={() => setCheckBox(item.id)}
                    checked={item.checkedStatus || false} // ✅ Ensure it reads from checkedStatus
                  />
                )}
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No bookmarks</Text>
      )}

      {isEdit && (
        <TouchableOpacity style={styles.deleteButton} onPress={removeBook}>
          <Icon name="delete" type="antdesign" size={20} color="white" />
          <View style={styles.containerDelete}>
            <Text style={styles.deleteText}> Delete </Text>
          </View>
        </TouchableOpacity>
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
  rating: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  seeDetail: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'right',
    position: 'relative',
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
    marginLeft: 5,
  },
  editButton: {
    position: 'absolute',
    padding: 20,
    right: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDelete: {
    marginLeft: 8,
  },
  deleteText: {
    color: 'white',
  },
});
