import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/categoriesScreen';
import CategoryMealsScreen from '../screens/categoryMealsScreen';
import MealDetailsScreen from '../screens/mealDetailsScreen';
import FavoritesScreen from '../screens/favoritesScreen';
import FiltersScreen from '../screens/filtersScreen';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';

// set ip default stack nav options

const defaultStackNavOptions = {
  // congigure the header style
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  headerTitleAlign: 'center',
  headerBackTitleStyle: {
    fontSize: 16,
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};
// set up a stack navigator
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    'Category Meals': {
      screen: CategoryMealsScreen,
    },
    'Meal Details': {
      screen: MealDetailsScreen,
    },
  },
  // insert default stack nav options as 2nd arg
  { defaultNavigationOptions: defaultStackNavOptions }
);

// create favorites screen stack
const FavoritesNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
    },
    'Meal Details': {
      screen: MealDetailsScreen,
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

// create stack nav for filters
const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);
// global tab config for tab navigator
const tabScreenConfig = {
  Meals: {
    // the whole stack nav returns a screen, so can be put in here
    screen: MealsNavigator,
    navigationOptions: {
      // configure it's tab style
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  // the other tab
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.secondary,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        ),
    },
  },
};

// set up a tab navigator per platform and use global config plus platform dependent styles
const TabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        // configure the tab styles

        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          activeTintColor: Colors.secondary,
        },
      });

const MainNavigator = createDrawerNavigator(
  {
    'Meals Favs': {
      screen: TabNavigator,
      navigationOptions: {
        // can overwrite the identifier to label the drawer element title
        drawerLabel: 'Meals',
      },
    },
    Filters: {
      screen: FiltersNavigator,
    },
  },
  {
    // side drawer styes
    contentOptions: {
      activeTintColor: Colors.secondary,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  }
);

export default createAppContainer(MainNavigator);
