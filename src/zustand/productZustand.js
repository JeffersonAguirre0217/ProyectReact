import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { actionAlert } from './alertZustand';
import { history } from '../components/shared/helper/history';


const { setState, getState } = storeApp

const addProduct = ((newProduct) => {
    actionAlert.clear()
    const product = getState().products.list

    if (_getByName(newProduct.name)) {
        actionAlert.errorAlert('Product name cannot be repeated')
    } else {
        const id = product.length ? Math.max(...product.map(x => x.id)) + 1 : 1;
        newProduct.id = id;
        setState(
            produce(state => {
                state.products.list = [...product, newProduct]
            }
            ))
        actionAlert.success('Product was created successfully')
        history.navigate('/products')
    }
})

const _getById = ((id) => {
    const products = getState().products.list
    const product = products.find(x => Number(x.id) === Number(id) ? x : null)
    return product
})

const _getByName = ((name) => {
    const products = getState().products.list
    const result = products.find(x => x.name === name ? true : null)
    return result
})

const _updateProduct = ((id, data) => {
    actionAlert.clear()
    const products = getState().products.list
    const newData = { ...data, id }
    const newProducts = products.map((product) => {
        if (Number(product.id) === Number(id)) {
            return newData
        } else {
            return product
        }
    })

    setState(
        produce(state => {
            state.products.list = newProducts
        }
        ))
    actionAlert.success('Product was updated successfully')
    history.navigate('/products')

})

const _deleteProduct = ((id) => {
    const products = getState().products.list
    const product = products.filter(x => x.id !== id);
    setState(
        produce(state => {
            state.products.list = product
        }
        ))
    actionAlert.success('Product was successfully deleted')
})

export const actionProducts = {
    addNewProduct: addProduct,
    updateProduct: _updateProduct,
    getById: _getById,
    deleteProduct: _deleteProduct
}