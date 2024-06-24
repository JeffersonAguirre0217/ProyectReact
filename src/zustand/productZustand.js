import { produce } from 'immer';
import { storeApp } from './storeZustand';


const { setState, getState } = storeApp

const addProduct = ((newProduct) => {
    const product = getState().products.list
    const id = product.length ? Math.max(...product.map(x => x.id)) + 1 : 1;
    newProduct.id = id;
    setState(
        produce(state => {
            state.products.list = [...product, newProduct]
        }
    ))
})

const _getById = ((id) => {
    const products = getState().products.list
    const product = products.find(x => Number(x.id) === Number(id) ? x : null)
    const result = product
    return result

})

const _updateProduct = ((id, data) => {
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

})

const _deleteProduct = ((id) => {
    const products = getState().products.list
    const product = products.filter(x => x.id !== id);
    debugger
    setState(
        produce(state => {
            state.products.list = product
        }
    ))
})

export const actionProducts = {
    addNewProduct: addProduct,
    updateProduct: _updateProduct,
    getById: _getById,
    deleteProduct: _deleteProduct
}