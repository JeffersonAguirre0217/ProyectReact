import { produce } from 'immer';
import { storeApp } from './storeZustand';
import { history } from '../components/shared/helper/history';
import { actionAlert } from './alertZustand';


const { setState, getState } = storeApp

const addCategory = ((newCategory) => {
    actionAlert.clear()
    const category = getState().categories.list

    if (_getByName(newCategory.name)) {
        actionAlert.errorAlert('Category name cannot be repeated')
    } else {
        let id = null
        if(category === null){
            id = 1  
        }else{
            id = category.length ? Math.max(...category.map(x => x.id)) + 1 : 1;
        }
        newCategory.id = id;
        setState(
            produce(state => {
                if(category === null){
                    state.categories.list = [newCategory]
                }else{
                    state.categories.list = [...category, newCategory]
                }
            }
            ))
        actionAlert.success('Category was created successfully')
        history.navigate('/categories')
    }
})

const _getAll = (async () => {
    return getState(state => state.categories)
}
)

const _getById = ((id) => {
    const categories = getState().categories.list

    if (IsNullCategories()) return categories
    const category = categories.find(x => Number(x.id) === Number(id))
    return category
})

const _getByName = ((name) => {
    const categories = getState().categories.list
    if (IsNullCategories()) return false
    const category = categories.find(x => x.name === name ? true : false)
    return category

})

const _filterByName = (async (name) => {
    const categories = getState().categories.list
    const category = categories.filter(result => {
        if (result.name.toLowerCase() === name.toLowerCase()) {
            return result
        } else if (name.length === 0) {
            return categories
        }
    })
    return category

})

const _updateCategory = ((id, data) => {
    actionAlert.clear()
    const categories = getState().categories.list

    if (_getByName(data.name)) {
        actionAlert.errorAlert('Category name already exists')
    } else {
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
        actionAlert.success('Category was updated successfully')
        history.navigate('/categories')
    }
})

const _deleteCategory = ((id) => {
    actionAlert.clear()
    const categories = getState().categories.list
    const category = categories.filter(x => x.id !== id);
    setState(
        produce(state => {
            if(categories.length === 1){
                state.categories.list = null
            }else{
                state.categories.list = category
            }
            
        }
        ))
    actionAlert.success('Category was successfully deleted')
    window.location.reload()
})

function IsNullCategories(){
    const result = getState().categories.list
    return result === null ? true : false
}

export const actionCategories = {
    addNewCategory: addCategory,
    updateCategory: _updateCategory,
    getById: _getById,
    filterByCategory: _filterByName,
    getAll: _getAll,
    deleteCaregory: _deleteCategory
}