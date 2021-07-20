import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import UsersScreen from "./screens/UsersScreen";
import PostsScreen from "./screens/PostsScreen";
import CommentsScreen from "./screens/CommentsScreen";

export default function App() {
  const UsersStack = createStackNavigator();

  function UsersStackScreen() {
    return (
      <UsersStack.Navigator>
        <UsersStack.Screen name="Users" component={UsersScreen} />
      </UsersStack.Navigator>
    );
  }

  const PostsStack = createStackNavigator();

  function PostsStackScreen() {
    return (
      <PostsStack.Navigator>
        <PostsStack.Screen name="Posts" component={PostsScreen} />
        {/* <PostsStack.Screen name="Details" component={DetailsScreen} /> */}
      </PostsStack.Navigator>
    );
  }
  const CommnetsStack = createStackNavigator();

  function CommentStackScreen() {
    return (
      <CommnetsStack.Navigator>
        <CommnetsStack.Screen name="Comments" component={CommentsScreen} />
        {/* <CommnetsStack.Screen name="Details" component={DetailsScreen} /> */}
      </CommnetsStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Users") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Posts") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Comments") {
              iconName = focused ? "chatbox" : "chatbox-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Users" component={UsersStackScreen} />
        <Tab.Screen name="Posts" component={PostsStackScreen} />
        <Tab.Screen name="Comments" component={CommentStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
