import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Login, SignUp } from '../../services/auth';

export const LoginAsync = createAsyncThunk(
    'auth/Login',
   async (values) => {
        return await Login(values);
    }
)

export const SignUpAsync = createAsyncThunk(
    'auth/SignUp',
    async values => {
        return await SignUp(values)
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:[],
        loading:false,
        status:false,
        isUser:false,
        createUser:false,
    },
    reducers:{
        logOut:(state)=> {
            state.loading = false;
            state.isUser = false;
            state.status = false;
            sessionStorage.removeItem('token');
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAsync.pending,(state)=> {
            state.loading = false;
        })
        .addCase(LoginAsync.fulfilled,(state,action)=> {
            state.status = true;
            state.loading = false;
            state.user = action.payload;
            state.isUser = true;
            sessionStorage.setItem('token',action.payload.token);
            sessionStorage.setItem('userId',action.payload.userInfo._id)
        })
        .addCase(LoginAsync.rejected,(state,action)=> {
            state.status = false;
            state.loading = false;
            state.user = action.payload;
            state.isUser = false;
        })
        .addCase(SignUpAsync.pending,(state)=> {
            state.loading = false;
        })
        .addCase(SignUpAsync.fulfilled,(state)=> {
            state.loading = false;
            state.createUser = true;
        })
        .addCase(SignUpAsync.rejected,(state)=> {
            state.loading = false;
            state.createUser = false;
        })
    }
})

export const { logOut } = authSlice.actions;
export default authSlice.reducer