import { produce } from 'immer';
import { storeApp } from './storeZustand';


// create slice
const { setState} = storeApp

// payload = string message ('alert message')
// an object ({ message: 'alert message', showAfterRedirect: true })
const _success = ((message) => {
    ;
    setState(
        produce(state => {
            state.alert = {
                type: 'alert-success',
                message: message,
                error: null
            }
        })
    )
})

const _error = ((message) => {
    const data = {
        type: 'alert-danger',
        message: message,
        error: null
    }
    setState(
        produce(state => {
            state.alert = data
        })
    )
})

const _clear = (() => {
    setState(
        produce(state => {
            state.alert = {
                type: null,
                message: null,
                error: null
            }
        })
    )
})

export const actionAlert = {
    success: _success,
    errorAlert: _error,
    clear: _clear,
}
