import * as Yup from 'yup';

export default Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});