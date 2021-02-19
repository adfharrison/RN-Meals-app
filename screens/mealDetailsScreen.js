import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummyData';
import CustomHeaderButton from '../components/headerButton';

import DefaultText from '../components/defaultText';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.url }} style={styles.image} />
      <View>
        <View style={styles.details}>
          <DefaultText>{selectedMeal.duration}</DefaultText>
          <DefaultText>{selectedMeal.complexity}</DefaultText>
          <DefaultText>{selectedMeal.affordability}</DefaultText>
        </View>
        <Text style={styles.textTitle}>Ingredients</Text>
        {selectedMeal.ingredients.map((item) => {
          return <ListItem key={item}>{item}</ListItem>;
        })}
        <Text style={styles.textTitle}>Steps</Text>
        {selectedMeal.steps.map((item) => {
          return <ListItem key={item}>{item}</ListItem>;
        })}
      </View>
    </ScrollView>
  );
};

// configure header options
MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite'
          iconName='ios-star'
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  textTitle: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 20,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default MealDetailScreen;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { MEALS } from '../data/dummyData';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { CustomHeaderButton } from '../components/headerButton';

// const MealDetailsScreen = (props) => {
//   const mealId = props.navigation.getParam('mealId');
//   const selectedMeal = MEALS.find((meal) => {
//     return meal.id === mealId;
//   });

//   return (
//     <View style={styles.container}>
//       <Text>{selectedMeal.title}</Text>
//       <Button
//         title='Go back to categories'
//         onPress={() => {
//           props.navigation.popToTop();
//         }}
//       />
//     </View>
//   );
// };

// MealDetailsScreen.navigationOptions = (navigationData) => {
//   const mealId = navigationData.navigation.getParam('mealId');
//   const selectedMeal = MEALS.find((meal) => {
//     return meal.id === mealId;
//   });
//   return {
//     headerTitle: selectedMeal.title,
//     headerRight: () => {
//       return (
//         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//           <Item title='favorite' iconName='md-star' onPress={() => {}} />
//         </HeaderButtons>
//       );
//     },
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default MealDetailsScreen;
