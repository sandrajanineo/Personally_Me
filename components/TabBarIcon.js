import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  let size = props.size || 30

  return (
    <Ionicons
      name={props.name}
      size={size}
      style={props.style}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
