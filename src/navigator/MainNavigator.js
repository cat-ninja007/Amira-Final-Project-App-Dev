import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import WishlistScreen from "../screens/WishlistScreen";
import { Text, Icon } from "react-native-elements";
import BookListScreen from "../screens/BookListScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                // tabBarLabel: ({focused}) => {
                //     <Text style={{color: focused ? 'white' : 'lightblue', fontSize: 12}}>
                //         Home
                //     </Text>
                // },
                tabBarIcon: ({focused}) => (
                    <Icon
                      name="home"
                      type="material-community"
                      color={focused ? 'white' : 'lightblue'}
                      size={24}
                    />
                ),
                tabBarLabelPosition: 'below-icon',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: 'darkblue',
                }, 
                tabBarStyle: {
                    backgroundColor: 'darkblue',
                }
                }}/>
                
                <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{ 
                // tabBarLabel: ({focused}) => {
                //     <Text style={{color: focused ? 'white' : 'lightblue', fontSize: 12}}>
                //         Home
                //     </Text>
                // },
                tabBarIcon: ({focused}) => (
                    <Icon
                      name="book-open-variant"
                      type="material-community"
                      color={focused ? 'white' : 'lightblue'}
                      size={24}
                    />
                ),
                tabBarLabelPosition: 'below-icon',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'darkblue',
                }
                }}/>

                <Stack.Screen
                name="BookList"
                component={BookListScreen}
                options={{
                    headerShown: false, 
                    tabBarStyle: {
                        backgroundColor: 'darkblue',
                    }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator