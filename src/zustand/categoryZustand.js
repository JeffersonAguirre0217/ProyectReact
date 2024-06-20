import { produce } from 'immer';
import { storeCategories } from './storeZustand';


const { setState, getState } = storeCategories

const addCategory = ((newCategory) => {
    const category = getState().categories
    const id = category.length ? Math.max(...category.map(x => x.id)) + 1 : 1;
    newCategory.id = id;

    setState(
        produce(state => {
            state.categories = [...category, newCategory]
        }
        ))
})

const _getById = ((id) => {
    const categories = getState().categories
    const category = categories.find(x => x.id === id)
    return (category)

})

const _updateCategory = ((id, data) => {
    const categories = getState().categories
    const category = categories.find(x => x.id == id)
    
    let newCategories = [...categories ] 
    debugger
    newCategories[id - 1 ].name = data.name
    newCategories[id - 1 ].description = data.description
    
    setState(
        produce(state => {
            state.categories = newCategories
        }
        ))
    console.log('up', category);
})

const _deleteCategory = ((id) => {
    const categories = getState().categories
    const category = categories.filter(x => x.id !== id);
    setState(
        produce(state => {
            state.categories = category
        }
        ))
})




export const actionCategories = {
    addNewCategory: addCategory,
    updateCategory: _updateCategory,
    getById: _getById,
    deleteCaregory: _deleteCategory
}