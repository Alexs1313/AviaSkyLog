import {useState} from 'react';
import {Modal, View} from 'react-native';

const PopUp = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal transparent visible={showModal} statusBarTranslucent={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: 80,
        }}>
        <View
          style={{
            width: '70%',
            backgroundColor: '#111111',
            borderRadius: 32,
            paddingTop: 25,
            paddingBottom: 25,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: '#F12B1C',
            shadowColor: '#F12B1C',
            elevation: 40,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopUp;
