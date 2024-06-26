import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { actionAlert } from './alertZustand';
import { history } from '../components/shared/helper/history';


const { setState, getState } = storeApp

const register = ((newUser) => {
    actionAlert.clear()
    const users = getState().users.list
    const existUser = users.find(x => x.username === newUser.username ? x : null)
    
    if (existUser) {
        actionAlert.errorAlert('Username already exists')
    } else {
        const id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        newUser.id = id
        setState(
            produce(state => {
                state.users.list = [...users, newUser]
            }
        ))

        history.navigate('/login');
    }

})

export const actionUser = {
    registerUser: register,
}