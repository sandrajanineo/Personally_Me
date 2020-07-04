        { editMode ? (
          <View style={ styles.form }>
            <Form updateState={ updateState } details={ updatedFields } disableType={ true } />
              <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                  setLoading( true );
                  updateItem( userID, item.image, updatedFields );
                }}
              >
                <Text style={ styles.buttonText }>Save</Text>
              </TouchableOpacity>
          </View>
        ) : (
