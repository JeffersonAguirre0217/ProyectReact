import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { history } from '../components/shared/helper/history';

const { setState, getState } = storeApp

const _authenticate = ((data) => {
    
    ///const user = getState().users.list.find(x => x.username === data.username && x.password === data.password);
    
    //if (!user) return error('Username or password is incorrect');
    data.token = 'fake-jwt-token'
    setState(
        produce(state => {
            state.auth = { data }
        }
    ))

    history.navigate('/')
})

const _login = (({username, password})=>{
    const users = getState().users.list
    const validation = ()=>{
        return ('Username or password is incorrect');
    }
    users.map((user) => user.username === username && user.password === password ? _authenticate({username, password}) :   validation  )
    
})

const _logout = (()=>{
    setState(
        produce(state => {
            state.auth = null
        }
    ))
    history.navigate('/login');
})

export const actionAuth= {
    authActions: _authenticate,
    login : _login,
    logout: _logout

}