import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, VirtualizedList} from 'react-native';
import TabBarIcon from './TabBarIcon';

export default DropDown = (props) => {
  const [ modalVisible, setModalVisible ] = React.useState( { show: false, active: null } );
  const { data, updateState } = props;

  return (
    <View>
      {data.map( section => (
        <View key={section.key} style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible({ show: true, active: section.key })}
            style={styles.label}
          >
            <Text style={styles.textStyle}>{section.label}</Text>
            <TabBarIcon name="md-arrow-dropdown"
              style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.selected}>
            {section.selected ? `You selected: ${section.selected}` : ''}
          </Text>
        </View>
      ))}
      <Modal visible={modalVisible.show} transparent={true} >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={ () => setModalVisible({ show: false, active: null }) }
          >
            <Text style={styles.close}>X</Text>
          </TouchableOpacity>
          <FlatList
            data={modalVisible.show ? data[modalVisible.active]['options'] : []}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalTouch}
                onPress={ () => {
                  updateState(item.category, item.value);
                  setModalVisible({ show: false, active: null });
                }}
              >
                <Text style={styles.modalText}>{item.value}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={ (item, index) => index.toString() }
            style={styles.list}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
  },
  textStyle: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
    width: 180,
  },
  icon: {
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
    paddingRight: 10,
    paddingTop: 5
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute",
    bottom: 0,
    width: '100%',
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  modalTouch: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    padding: 5
  },
  selected: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderBottomWidth: 0,
    marginRight: 30
  },
  closeModal: {
    position: 'absolute',
    right: 0,
    padding: 10,
    paddingRight: 15
  },
  close: {
    fontSize: 12,
    color: 'gray',
  },
});
