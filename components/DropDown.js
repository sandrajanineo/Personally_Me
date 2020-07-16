import * as React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native';
import TabBarIcon from './TabBarIcon';

export default DropDown = (props) => {
  const [ modalVisible, setModalVisible ] = React.useState( { show: false, active: null } );
  const { data, updateState, disableType } = props;

  return (
    <View>
      {data.map( section => (
        section.disable ? (
        <View key={section.key} style={styles.container}>
        { section.altLabel ?
          <Text key={section.key} style={styles.typeText} >{section.altLabel}</Text>
          : <Text></Text>
        }
        </View>
        ) : (
        <View key={section.key} style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible({ show: true, active: section.key })}
            style={styles.flexRow}
          >
            <Text style={styles.textStyle}>{section.label}</Text>
            <TabBarIcon name="md-arrow-dropdown" style={styles.icon} />
          </TouchableOpacity>

          { section.key === 3 && section.selected.length ?
              <View style={ styles.colorsContain }>
                <Text style={ styles.selected }>You selected: </Text>
                { section.selected.map( (color, i) => (
                  <TouchableOpacity
                    style={ styles.flexRow }
                    onPress={() => updateState( 'remove', 'Color', color )}
                    key={ i.toString() }
                  >
                    <TabBarIcon name="md-remove-circle" style={ styles.removeIcon }/>
                    <Text style={ styles.selections }>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            :
              section.selected  && section.key !== 3 ?
              <View>
                <Text style={ styles.selected }>You selected: </Text>
                  <TouchableOpacity
                    style={ styles.flexRow }
                    onPress={() => updateState( 'remove', section.category, '' )}
                  >
                    <TabBarIcon name="md-remove-circle" style={ styles.removeIcon }/>
                    <Text style={ styles.selections }>{section.selected}</Text>
                  </TouchableOpacity>
              </View>
              :
                <Text style={ styles.noneSelected }></Text>
          }

        </View>
        )))}
      <Modal visible={modalVisible.show} transparent={true} >
        <TouchableWithoutFeedback onPress={() => setModalVisible({ show: false, active: null })} >
          <View style={styles.modal} >
            <View style={styles.modalView}>
              <View>
                <TouchableOpacity
                  style={styles.closeModal}
                  onPress={ () => setModalVisible({ show: false, active: null }) }
                >
                <TabBarIcon name="md-close-circle" style={styles.close}/>
                </TouchableOpacity>
              </View>
              <FlatList
                data={modalVisible.show ? data[modalVisible.active]['options'] : []}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalTouch}
                    onPress={ () => {
                      updateState('add', item.category, item.value);
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
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flexRow: {
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
  typeText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 15,
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
    padding: 5,
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
  modal: {
    height: '100%',
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
    marginTop: 5,
  },
  list: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  closeModal: {
    right: -175,
    paddingBottom: 5,
  },
  close: {
    fontSize: 20,
    color: 'gray',
  },
  noneSelected: {
    display: 'none'
  },
  selections: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  colorsContain: {
    marginBottom: 10,
  },
  removeIcon: {
    fontSize: 20,
    color: 'gray',
    marginRight: 5,
  },
});
