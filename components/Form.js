import * as React from 'react';

import DropDown from './DropDown';

const Form = (props) => {
  let { details, updateState, screen, disableType, type } = props;

  let data = [{
    key: 0,
    label: "Select the Type *",
    options: screen === 'OutfitGeneratorForm' ?
      [ { category: 'Type', value: 'One Piece' }, { category: 'Type', value: 'Two Piece' } ] 
      :
      [ { category: 'Type', value: 'Bottoms' }, { category: 'Type', value: 'One Piece' }, { category: 'Type', value: 'Top' },
      { category: 'Type', value: 'Shoes' } ],
    selected: details.Type || type,
    disable: disableType,
    altLabel: `Type: ${details.Type || type}`,
    category: 'Type'
  },{
    key: 1,
    label: "Select the Occassion ",
    options: [ { category: 'Occassion', value: 'Business' }, { category: 'Occassion', value: 'Casual' }, { category: 'Occassion', value: 'Night Out' },
              { category: 'Occassion', value: 'Sporty' } ],
    selected: details.Occassion || '',
    category: 'Occassion'
  },
  {
    key: 2,
    label: "Select the Season ",
    options: [ { category: 'Season', value: 'Fall' }, { category: 'Season', value: 'Spring' }, { category: 'Season', value: 'Summer' },
              { category: 'Season', value: 'Winter' } ],
    selected: details.Season || '',
    category: 'Season'
  },
  {
    key: 3,
    label: "Select the Color ",
    options: [ { category: 'Color', value: 'Black' }, { category: 'Color', value: 'Blue' }, { category: 'Color', value: 'Green' },
              { category: 'Color', value: 'Orange' }, { category: 'Color', value: 'Pink' }, { category: 'Color', value: 'Red' },
              { category: 'Color', value: 'Violet' }, { category: 'Color', value: 'White' }, { category: 'Color', value: 'Yellow' },
              { category: 'Color', value: 'Denim' }, { category: 'Color', value: 'Patterned' } ],
    selected: details.Color || '',
    category: 'Color'
  }, {
    key: 4,
    label: "Select the Location",
    options: [ { category: 'Location', value: 'Closet' }, { category: 'Location', value: 'Under Bed' } ],
    selected: details.Location || '',
    disable: screen === 'OutfitGeneratorForm' ? true : false,
    altLabel: '',
    category: 'Location'
  }];
  
  return (
    <>
      <DropDown data={data} updateState={updateState} disableType={disableType} />
    </>
  )
};

export default Form;
