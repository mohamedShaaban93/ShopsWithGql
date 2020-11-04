import React, { useEffect, useRef, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Alert, Image, Platform, Text, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import { ADD_POST } from '../../graphql/mutations/postMutation';
import AndroidPermission from '../../utilities/AndroidPermission';
import { styles } from './styles';
import { Formik } from 'formik';
import { buildValidationSchema } from './validation';
import { SINGLE_UPLOAD } from '../../graphql/mutations/SingleUpload';
import { ReactNativeFile } from 'apollo-upload-client'
import { SIGN_UP } from '../../graphql/mutations/SignupMutaion';


interface MyFormValues {
  name: string;
  email: string;
  password: string;
  image: string;
}
interface Props {
  componentId: string;
}

type submitValue = {
  setSubmitting: (v: boolean) => void;
  setFieldError: (field: string, errorMsg: string) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}


export const SignUp: React.FC<Props> = (props: Props) => {
  const [uri, setUri] = useState('')
  const [loading, setloading] = useState(false)





  const onSubmit = async (values: MyFormValues, { setSubmitting, setFieldError, setFieldValue }: submitValue) => {
    const file = new ReactNativeFile({
      uri,
      type: 'image/*',
      name: 'profile.jpg',
    })
    setloading(true)
    signUpHandler({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
        profileImg: file
      },

    }).then((data) => {
      console.log('dataaaaaaaa',data);
    }
    ).catch((error) => {
      if (JSON.stringify(error.graphQLErrors[0].message).includes('Email Already Exists')) {
        setFieldError('email', 'Existing email');
        
      } else {
        console.log('ppppppppppppppppppppppp',error);

      }
    }
    ).finally(() => setloading(false)
    )
  };

  const selectedImage = (uri: string) => { setUri(uri) }


  const [signUpHandler, { data }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      console.log('dddddddddddddddddddddddddddd', data);

    }
  });

  const initialValues: MyFormValues = { name: '', email: '', password: '', image: '' };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={buildValidationSchema()}
        onSubmit={async (values, { setSubmitting, setFieldError, setFieldValue }) =>
          await onSubmit(values, { setSubmitting, setFieldError, setFieldValue })
        }>
        {({
          values,
          errors,
          setFieldError,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
          /* and other goodies */
        }) => {
          return (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Enter name'
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name &&
                  <Text style={styles.errorText}>please add the name</Text>}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Enter Email'
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email &&
                  <Text style={styles.errorText}>please add the email</Text>}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Enter password'
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={handleBlur('password')}
                />
                {errors.password && touched.password &&
                  <Text style={styles.errorText}>please add the password</Text>}
              </View>

              <View style={styles.imgContainer}>
                {uri ?
                  <Image
                    style={styles.image}
                    source={{
                      uri
                    }}
                    onLoad={() => {
                      setFieldValue('image', uri)
                    }}
                    onError={() => {
                      setFieldError('image', 'There is not image')
                    }}
                  /> : <View style={{ width: 200, height: 200 }}></View>}
              </View>
              {errors.image && touched.image &&
                <Text style={styles.errorText}>please Add image</Text>}
              <Button
                onPress={async () => {
                  if (Platform.OS === 'ios') return;
                  let allowed = await AndroidPermission();
                  console.log('aaaaaaaaaaaaaaaaaaaa', allowed);


                  if (allowed) {
                    Navigation.push(props.componentId, {
                      component: {
                        name: 'photoSelection',
                        passProps: {
                          imageSelected: selectedImage,
                        },
                      },
                    });
                  }
                  else {
                    Alert.alert("You must Allow to show your image")
                  }
                }}
              >Add Image</Button>
              <View style={styles.addEmployeeContainer}>
                {!loading ? (

                  <Button
                    mode="contained"
                    color="#841584"
                    onPress={handleSubmit}
                  >Add</Button>
                ) : (
                    <ActivityIndicator size="large" color="black" />
                  )}
              </View>
            </View>
          )
        }}
      </Formik>
    </View>

  )
};
