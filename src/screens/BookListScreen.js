import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { historyBook } from '../../Data/BookList'
import { Image } from 'react-native-elements'

const BookListScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
      data={historyBook}
      contentContainerStyle={styles.flatListContainer}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => {
        return(
            <View style={styles.bookContainer}>
                <View style={styles.bookImageContainer}>
                    <Image style={styles.bookImage} source={{uri: item.imageLink}}/>
                </View>

                <View style={styles.bookInfoContainer}>
                    <Text>Title</Text>
                    <Text>Author</Text>
                    <Text>Page</Text>
                </View>
            </View>
        )
      }}/>
    </View>
  )
}

export default BookListScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'skyblue'
    }
})