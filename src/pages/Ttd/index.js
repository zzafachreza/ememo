import React, {useState, useEffect, useRef} from 'react';

import SignatureScreen from 'react-native-signature-canvas';
import {View} from 'react-native';
import {windowHeight} from '../../utils/fonts';

const Ttd = ({text, onOK}) => {
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = signature => {
    console.log(signature);
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!');
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = data => {
    console.log(data);
  };

  return (
    <View style={{flex: 1, paddingTop: windowHeight / 3}}>
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        //   autoClear={true}
        descriptionText={text}
      />
    </View>
  );
};

export default Ttd;
