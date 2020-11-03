import {PermissionsAndroid} from 'react-native';

export default async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  console.log('eeeeeeeeeeeeeeeeeeeeeeeee',hasPermission);
  
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};
