import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider as PaperProvider } from "react-native-paper";

import { BlogProvider } from "./context/BlogProvider";
import reducer, { initialState } from "./context/reducer";

import UsersScreen from "./screens/UsersScreen";
import PostsScreen from "./screens/PostsScreen";
import CommentsScreen from "./screens/CommentsScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import CreateuserScreen from "./screens/CreateuserScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "./components/HeaderButton";
import CreatePostScreen from "./screens/CreatePostScreen";
import CreateCommentScreen from "./screens/CreateCommentScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";
import CommentDetailScreen from "./screens/CommentDetailScreen";
import UpdatePostScreen from "./screens/UpdatePostScreen";
import UpdateCommentScreen from "./screens/UpdateCommentScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";

function App() {
  const UsersStack = createStackNavigator();

  function UsersStackScreen() {
    return (
      <PaperProvider>
        <UsersStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#1e4643",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <UsersStack.Screen
            name="Users"
            component={UsersScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Add User"
                    iconName="person-add"
                    onPress={() => navigation.navigate("CreateUsers")}
                  />
                </HeaderButtons>
              ),
            })}
          />
          <UsersStack.Screen name="UserDetails" component={UserDetailScreen} />
          <UsersStack.Screen name="CreateUsers" component={CreateuserScreen} />
          <UsersStack.Screen name="UserUpdating" component={UpdateUserScreen} />
        </UsersStack.Navigator>
      </PaperProvider>
    );
  }

  const PostsStack = createStackNavigator();

  function PostsStackScreen() {
    return (
      <PostsStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#1e4643",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <PostsStack.Screen
          name="Posts"
          component={PostsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Post"
                  iconName="add-circle"
                  onPress={() => navigation.navigate("CreatePost")}
                />
              </HeaderButtons>
            ),
          })}
        />
        <PostsStack.Screen name="CreatePost" component={CreatePostScreen} />
        <PostsStack.Screen name="PostDetails" component={PostDetailsScreen} />
        <PostsStack.Screen name="PostUpdating" component={UpdatePostScreen} />
      </PostsStack.Navigator>
    );
  }
  const CommnetsStack = createStackNavigator();

  function CommentStackScreen() {
    return (
      <CommnetsStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#1e4643",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <CommnetsStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Comments"
                  iconName="add-circle"
                  onPress={() => navigation.navigate("CreateComment")}
                />
              </HeaderButtons>
            ),
          })}
        />
        <CommnetsStack.Screen
          name="CreateComment"
          component={CreateCommentScreen}
        />
        <CommnetsStack.Screen
          name="CommentDetail"
          component={CommentDetailScreen}
        />
        <CommnetsStack.Screen
          name="UpdateComment"
          component={UpdateCommentScreen}
        />
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
          activeTintColor: "#1e4643",
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

export default () => {
  return (
    <BlogProvider initialState={initialState} reducer={reducer}>
      <App />
    </BlogProvider>
  );
};
