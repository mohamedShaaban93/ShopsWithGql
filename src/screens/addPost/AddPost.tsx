import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Text, View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import { ADD_POST, Sign_Up } from '../../graphql/mutations/postMutation';
import ImagePicker from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';

interface Props {
  componentId: string;
}



export const AddPost: React.FC<Props> = (props: Props) => {

  const [SignUp] = useMutation(Sign_Up, {
    onCompleted: (data) => {
      console.log(data);

    }
  });

  const [title, settitle] = useState('')
  const [body, setbody] = useState('')
  const [imageUrl, setImageurl] = useState<imageInterFace>({});

  interface imageInterFace {
    uri?: string;
    type?:string;
    fileName?:string;
  }


  const setImage = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source =  {uri:response.uri,type:response.type} 

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImageurl(source);
      }
    });
  }


  return (
    <View>
      <TextInput
        placeholder='title'
        onChangeText={(value) => settitle(value)}
      />
      <TextInput
        placeholder='body'
        onChangeText={(value) => setbody(value)}
      />

      <Button
        title="image"
        onPress={setImage}
      />

      <Button
        title="Add"
        onPress={() => {
          
          const file =new ReactNativeFile({
            uri:imageUrl?.uri,
            name:imageUrl?.fileName,
            type:imageUrl?.type
          })
          console.log("image urllllllllllllllllllllll",file);
          SignUp({
            variables: {
              profileImg:file , name:body , email:title 
            }

          }).then(res=>console.log("reeeeeees",res)).catch(error=>console.log("errorrrr",error))

          // Navigation.pop(props.componentId)
        }}
      />

    </View>
  )
};
