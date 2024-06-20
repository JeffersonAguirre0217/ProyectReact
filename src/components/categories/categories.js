import './categories.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
//import { categoryActions} from '../../redux/categorySlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';

import { storeCategories } from '../../zustand/storeZustand';
import { actionCategories } from '../../zustand/categoryZustand';
//import  { actionCategories } from '../../zustand/categoryZustand';


function Categories(){

    const categories = storeCategories(state => state.categories);
    
    //reduces
    //const categories = useSelector(x => x.categories.list);
    //const dispatch = useDispatch(); 

    
    
    useEffect(()=> {
        console.log(categories);
        //dispatch(categoryActions.getAll());
    },[]);

    return(
        <div>
        <h2>Categories</h2>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add category</Link>
            {!(categories?.loading || categories?.error) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>id</th>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>description</th>
                        <th style={{ width: '20%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(category =>
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td></td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${category.id}`} className="btn btn-sm btn-secondary me-1"><FontAwesomeIcon icon={faEye} className='m-0'/></Link>
                                <Link to={`edit/${category.id}`} className="btn btn-sm btn-primary me-1"><FontAwesomeIcon icon={faEdit} className='m-0'/></Link>
                                {<button onClick={() => actionCategories.deleteCaregory(category.id)} className="btn btn-sm btn-danger">
                                    {category.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span><FontAwesomeIcon icon={faDeleteLeft} className='m-0'/></span>
                                    }
                                </button> }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            }
            {categories?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {categories?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading  {categories.error}</div>
                </div>
            }
        </div>
    );
}

export { Categories };