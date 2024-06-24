import { produce } from 'immer';
import { storeApp } from './storeZustand';


const { setState, getState } = storeApp

const register = ((newUser) => {
    const users = getState().users.list
    const id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    newUser.id = id
    setState(
        produce(state => {
            state.users.list = [...users, newUser]
        }
    ))
})

export const actionUser= {
    registerUser: register,
}