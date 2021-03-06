import * as yup from 'yup';

export const buildValidationSchema = () => {
  const obj = {
    name: yup.string().required('required'),
    email: yup.string().required('required'),
    password: yup.string().required('required'),
    image: yup.string().required('required'),
  };
  return yup.object().shape(obj);
};
