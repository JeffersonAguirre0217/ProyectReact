import { produce } from 'immer';
import { storeApp } from './storeZustand';


const { setState, getState } = storeApp

const addCategory = ((newCategory) => {
    const category = getState().categories.list
    const id = category.length ? Math.max(...category.map(x => x.id)) + 1 : 1;
    newCategory.id = id;
    setState(
        produce(state => {
            state.categories.list = [...category, newCategory]
        }
    ))
})

const _getById = ((id) => {
    const categories = getState().categories.list
    const category = categories.find(x => Number(x.id) === Number(id))
    return category

})

const _updateCategory = ((id, data) => {
    const categories = getState().categories.list
    const newData = { ...data, id }
    const newCategories = categories.map((category) => {
        if (Number(category.id) === Number(id)) {
            return newData
        } else {
            return category
        }
    })
    
    setState(
        produce(state => {
            state.categories.list = newCategories
        }
    ))

})

const _deleteCategory = ((id) => {
    const categories = getState().categories.list
    const category = categories.filter(x => x.id !== id);
    setState(
        produce(state => {
            state.categories.list = category
        }
    ))
})




export const actionCategories = {
    addNewCategory: addCategory,
    updateCategory: _updateCategory,
    getById: _getById,
    deleteCaregory: _deleteCategory
}