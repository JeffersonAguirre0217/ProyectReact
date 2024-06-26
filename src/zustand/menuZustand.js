import { produce } from 'immer';
import { storeApp } from './storeZustand';


// create slice
const { setState, getState} = storeApp

// payload = string message ('alert message')
// an object ({ message: 'alert message', showAfterRedirect: true })
const _menuClick = (() => {
    const open = getState().menu 

    if(open){
        close()
    }else{
        setState(
            produce(state => {
                state.menu = 'invisible h-0 w-0'
            })
        )
    }
    
})

const close = (() => {
    setState(
        produce(state => {
            state.menu = null
        })
    )
})

export const actionMenu = {
    menuClick : _menuClick
}
