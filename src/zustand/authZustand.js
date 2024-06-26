import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { history } from '../components/shared/helper/history';
import { actionAlert } from './alertZustand'

const { setState, getState } = storeApp

const _authenticate = ((data) => {
    
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
    actionAlert.clear()
    //debugger
    users.map((user) => {
        if(user.username === username && user.password === password){
            return _authenticate({username, password}) 
        }if((user.username === username && user.password !== password) || (user.username !== username && user.password === password) ){
            return actionAlert.errorAlert('UserName or Password is incorrect')
        } else{
            return actionAlert.errorAlert("You don't have an account yet")
        }
    })
    
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