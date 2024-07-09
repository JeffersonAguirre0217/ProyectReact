import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { actionAlert } from './alertZustand';
import { history } from '../components/shared/helper/history';


const { setState, getState } = storeApp

const addProduct = ((newProduct) => {
    actionAlert.clear()
    const products = getState().products.list

    if (_getByName(newProduct.name)) {
        actionAlert.errorAlert('Product name cannot be repeated')
    } else {
        let id = null
        if(products === null){
            id = 1
        }else{
            id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
        }
        newProduct.id = id;
        setState(
            produce(state => {
                if(products === null){
                    state.products.list = [newProduct]
                }else{
                    state.products.list = [...products, newProduct]
                }
                
            }
            ))
        actionAlert.success('Product was created successfully')
        history.navigate('/products')
    }
})

const _getAll = (async () => {
        return getState(state => state.products)
    }
)

const _getById = (async(id) => {
    const products = getState().products.list
    if(products === null) return true
    const product = products.find(x => Number(x.id) === Number(id) ? x : null)
    return product
})

const _getByName = ((name) => {
    const products = getState().products.list
    if(isNullProduct()) return false
    const result = products.find(x => x.name === name ? true : null)
    return result
})

const _filterByName = (async (name) => {
    const products = getState().products.list
    const product = products.filter(result => {
        if (result.name.toLowerCase() === name.toLowerCase()) {
            return result
        } else if (name.length === 0) {
            return products
        }
    })
    return product
})

const _filterByCategory = (async (category) => {
    const products = getState().products.list
    if(category === 'All') return products
    const product = products.filter(result => {
        if (result.category.toLowerCase() === category.toLowerCase()) {
            return result
        } else if (category.length === 0) {
            return products
        }
    })
    return product
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
    actionAlert.clear()
    const products = getState().products.list
    const product = products.filter(x => x.id !== id);
    setState(
        produce(state => {
            if(products.length === 1){
                state.products.list = null
            }else{
                state.products.list = product
            }
        }
    ))
    actionAlert.success('Product was successfully deleted')
    window.location.reload()
})

function isNullProduct(){
    const result = getState().products.list
    if(result === null) {
        return true
    } else {
        return false
    }
}

export const actionProducts = {
    addNewProduct: addProduct,
    updateProduct: _updateProduct,
    filterByProduct: _filterByName,
    filterByCategory: _filterByCategory,
    getById: _getById,
    getAll : _getAll,
    deleteProduct: _deleteProduct
}