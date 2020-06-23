import * as React from 'react';
import { Picker, StyleSheet } from 'react-native';

import DropDown from './DropDown';

const Form = (props) => {
  let { details, updateState, disable } = props;
  
  let data = [{
    key: 0,
    label: "Select the occasion ",
    options: [ { value: 'Business' }, { value: 'Casual' }, { value: 'Night Out' }, { value: 'Sports' } ],
    selected: null
  },
  {
    key: 1,
    label: "Select the season ",
    options: [ { value: 'Fall' }, { value: 'Spring' }, { value: 'Summer' }, { value: 'Winter' } ],
    selected: null
  },
  {
    key: 2,
    label: "Select the color ",
    options: [ { value: 'Black' }, { value: 'Blue' }, { value: 'Green' }, { value: 'Orange' }, { value: 'Pink' }, { value: 'Red' }, { value: 'Violet' },
            { value: 'White' }, { value: 'Yellow' }],
    selected: null
  },
  {
    key: 3,
    label: "Select the type ",
    options: [ { value: 'Bottoms' }, { value: 'One Piece' }, { value: 'Tops' } ],
    selected: null
  }];
  
  return (
    <>
      <DropDown data={data} />
    </>
  )
};

export default Form;

const styles = StyleSheet.create({
  formOptions: {
    height: 200,
    width: '95%',
    paddingTop: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 50,
    alignSelf: 'center',
  }
});


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
