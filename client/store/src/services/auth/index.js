import axios from 'axios';

export const Login = async (values) => {

    try {
        const response = await axios.post('http://localhost:8080/auth/login', values);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
}

export const SignUp = async (values) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/sign', values);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
}