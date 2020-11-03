import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginHorizontal:15
  },
  header: {
    color: '#FBE5E5',
    fontSize: 20,
  },
  imgContainer: {
    alignItems: 'center',
    height: 150,
    marginVertical: 15,
    justifyContent:'center'
  },
  image: {
    width: 150,
    height: 150,
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  addEmployeeContainer: {
    position: 'absolute',
    marginVertical: 20,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical:10

  },
  input: {
    height: 40,
    backgroundColor:'#e3eeea',
    borderColor: 'gray',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    

  }
});
