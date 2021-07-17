import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

const dorms = [
  '학생동(구관-남자동)',
  '학생동(구관-여자동)',
  '프런티어관(신관-남자동)',
  '프런티어관(신관-여자동)',
];

const Dropdown = ({ dormSelection, setDorm }) => {
  return (
    <SelectDropdown
      data={dorms}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      defaultButtonText={'소속 동'}
      dropdownStyle={styles.dropdownStyle}
      rowTextStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
      renderDropdownIcon={() => {
        return <Icon name="down" size={10} color="#9F9F9F" />;
      }}
      dropDownIconPosition={'right'}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        () => {
          setDorm(selectedItem);
        };
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 143,
    height: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(133, 0, 0, 0.15)',
    backgroundColor: '#f9f7f4',
  },
  buttonTextStyle: {
    fontSize: 12,
    width: 143,
    textAlign: 'left',
    color: '#515151',
  },
  dropdownStyle: {
    backgroundColor: '#f9f7f4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rowStyle: {
    backgroundColor: '#f9f7f4',
  },
  rowTextStyle: {
    fontSize: 12,
    color: '#515151',
  },
});
export default Dropdown;
