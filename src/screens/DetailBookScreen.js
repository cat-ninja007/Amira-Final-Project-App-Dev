import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { historyBook } from '../../Data/BookList'

const DetailBookScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.bookImg}>
        <Image/>
      </View>
    </View>
  )
}

export default DetailBookScreen

const styles = StyleSheet.create({})