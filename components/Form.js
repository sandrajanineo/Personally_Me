import * as React from 'react';

import DropDown from './DropDown';

const Form = (props) => {
  let { details, updateState, screen, disableType } = props;
  
  let data = [{
    key: 0,
    label: "Select the type *",
    options: screen === 'OutfitGeneratorForm' ?
      [ { category: 'type', value: 'One Piece' }, { category: 'type', value: 'Two Piece' } ] 
      :
      [ { category: 'type', value: 'Bottoms' }, { category: 'type', value: 'One Piece' }, { category: 'type', value: 'Tops' } ],
    selected: details.type
  },{
    key: 1,
    label: "Select the occassion ",
    options: [ { category: 'occassion', value: 'Business' }, { category: 'occassion', value: 'Casual' }, { category: 'occassion', value: 'Night Out' },
              { category: 'occassion', value: 'Sports' } ],
    selected: details.occassion
  },
  {
    key: 2,
    label: "Select the season ",
    options: [ { category: 'season', value: 'Fall' }, { category: 'season', value: 'Spring' }, { category: 'season', value: 'Summer' },
              { category: 'season', value: 'Winter' } ],
    selected: details.season
  },
  {
    key: 3,
    label: "Select the color ",
    options: [ { category: 'color', value: 'Black' }, { category: 'color', value: 'Blue' }, { category: 'color', value: 'Green' },
              { category: 'color', value: 'Orange' }, { category: 'color', value: 'Pink' }, { category: 'color', value: 'Red' },
              { category: 'color', value: 'Violet' }, { category: 'color', value: 'White' }, { category: 'color', value: 'Yellow' }],
    selected: details.color
  }];
  
  return (
    <>
      <DropDown data={data} updateState={updateState} disableType={disableType} />
    </>
  )
};

export default Form;
