import React, { Component } from 'react';
import {
  Platform,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Navigation } from 'react-native-navigation';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { styles } from './styles'


interface Props {
  componentId: string;
  imageSelected: (uri: string) => void;
}
interface State {
  granted: boolean;
  selected: boolean;
  photos: CameraRoll.PhotoIdentifier[];
}

class PhotoSelection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getSelectedImages = this.getSelectedImages.bind(this);

  }
  state: State = {
    granted: Platform.OS === 'ios',
    selected: false,
    photos: [],
  };

  getSelectedImages(image: { uri: string }[]) {
    const uri = image[0].uri;
    this.props.imageSelected(uri);
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker
          groupTypes='SavedPhotos'
          maximum={1}
          selected={this.state.photos}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages} />
      </View>
    );
  }
}
export default PhotoSelection;
