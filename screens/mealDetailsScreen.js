import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummyData';
import CustomHeaderButton from '../components/headerButton';

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title='Go Back to Categories'
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

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
