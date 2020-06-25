import * as React from 'react';
import { Picker, StyleSheet } from 'react-native';

import DropDown from './DropDown';

const Form = (props) => {
  let { details, updateState, disable } = props;
  
  let data = [{
    key: 0,
    label: "Select the occassion ",
    options: [ { category: 'occassion', value: 'Business' }, { category: 'occassion', value: 'Casual' }, { category: 'occassion', value: 'Night Out' },
              { category: 'occassion', value: 'Sports' } ],
    selected: details.occassion
  },
  {
    key: 1,
    label: "Select the season ",
    options: [ { category: 'season', value: 'Fall' }, { category: 'season', value: 'Spring' }, { category: 'season', value: 'Summer' },
              { category: 'season', value: 'Winter' } ],
    selected: details.season
  },
  {
    key: 2,
    label: "Select the color ",
    options: [ { category: 'color', value: 'Black' }, { category: 'color', value: 'Blue' }, { category: 'color', value: 'Green' },
              { category: 'color', value: 'Orange' }, { category: 'color', value: 'Pink' }, { category: 'color', value: 'Red' },
              { category: 'color', value: 'Violet' }, { category: 'color', value: 'White' }, { category: 'color', value: 'Yellow' }],
    selected: details.color
  },
  {
    key: 3,
    label: "Select the type ",
    options: [ { category: 'type', value: 'Bottoms' }, { category: 'type', value: 'One Piece' }, { category: 'type', value: 'Tops' } ],
    selected: details.type
  }];
  
  return (
    <>
      <DropDown data={data} updateState={updateState} />
    </>
  )
};

export default Form;


      // <Picker
      //   selectedValue={details.occassion}
      //   style={styles.formOptions}
      //   onValueChange={ itemValue => updateState('occassion', itemValue)}
      // >
      //   <Picker.Item label="Select the occasion:" value="" />
      //   <Picker.Item label="Business" value="Business" />
      //   <Picker.Item label="Casual" value="Casual" />
      //   <Picker.Item label="Formal" value="Formal" />
      //   <Picker.Item label="Night Out" value="Night Out" />
      //   <Picker.Item label="Sporty" value="Sporty" />
      // </Picker>
      // <Picker
      //   selectedValue={details.color}
      //   style={styles.formOptions}
      //   onValueChange={ itemValue => updateState('color', itemValue)}
      // >
      //   <Picker.Item label="Select the color:" value="" />
      //   <Picker.Item label="Red" value="Red" />
      //   <Picker.Item label="Blue" value="Blue" />
      //   <Picker.Item label="Yellow" value="Yellow" />
      //   <Picker.Item label="White" value="White" />
      //   <Picker.Item label="Violet" value="Violet" />
      //   <Picker.Item label="Pink" value="Pink" />
      //   <Picker.Item label="Orange" value="Orange" />
      //   <Picker.Item label="Black" value="Black" />
      //   <Picker.Item label="Green" value="Green" />
      // </Picker>
      // <Picker
      //   selectedValue={details.season}
      //   style={styles.formOptions}
      //   onValueChange={ itemValue => updateState('season', itemValue)}
      // >
      //   <Picker.Item label="Select the season:" value="" />
      //   <Picker.Item label="Winter" value="Winter" />
      //   <Picker.Item label="Spring" value="Spring" />
      //   <Picker.Item label="Summer" value="Summer" />
      //   <Picker.Item label="Fall" value="Fall" />
      // </Picker>
      // { !disable && (
      //   <Picker
      //     selectedValue={details.category}
      //     style={styles.formOptions}
      //     onValueChange={ itemValue => updateState('category', itemValue)}
      //   >
      //     <Picker.Item label="Select the item type:" value="" />
      //     <Picker.Item label="Top" value="tops" />
      //     <Picker.Item label="Bottom" value="bottoms" />
      //     <Picker.Item label="Full Body" value="fullbody" />
      //   </Picker>
      // )}
