import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/colors';

import MealListItem from '../components/mealListItem';

import { CATEGORIES, MEALS } from '../data/dummyData';
import { FlatList } from 'react-native-gesture-handler';

const CategoryMealsScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealListItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.url}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'Meal Details',
            params: { mealId: itemData.item.id },
          });
        }}
      />
    );
  };
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '90%' }}
        data={displayedMeals}
        renderItem={renderMealItem}
      />
    </View>
  );
};

// apply title of screen to header based on category title
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find((cat) => {
    return cat.id === catId;
  });

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CategoryMealsScreen;
