import './categories.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';

import { storeApp } from '../../zustand/storeZustand';
import { actionCategories } from '../../zustand/categoryZustand';
import  { Alert } from '../shared/alert/alert'

function Categories() {

    const categories = storeApp(state => state.categories.list);

    const loading = false///storeCategories(state => state.loading)

    const styleCategory = {
        buttonAddCategory: 'bg-violet-500 hover:bg-violet-600 my-2 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-40 py-2  rounded-full',
        buttonUpdate: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-1 px-2 m-1  rounded-md',
        buttonDetail: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 py-1 px-2 m-0  rounded-md',
        buttonDelete: 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 py-1 px-2 m-0  rounded-md',
    }

    useEffect(() => {

    }, []);

    return (
        <div className='container py-3'>
            <h2>Categories</h2>
            <Alert />
            {categories.length >0 &&
                <div>
                    <Link to="add" className='py-2'>
                        <button className={styleCategory.buttonAddCategory}>Add Category</button>
                    </Link>
                    <table className="table-fixed border border-slate-500">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }} className='px-2'>N°</th>
                                <th style={{ width: '30%' }}>Name</th>
                                <th style={{ width: '30%' }}>Description</th>
                                <th style={{ width: '20%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category, index) =>
                                <tr className={`border border-slate-500 py-6 center ${index % 2 ? 'bg-slate-200' : ''}`} key={index} >
                                    <td className='px-2'>{index + 1}</td>
                                    <td className='px-2'>{category.name}</td>
                                    <td className='px-2'>{category.description}</td>
                                    <td></td>
                                    <td style={{ whiteSpace: 'nowrap' }} className='px-2'   >
                                        <Link to={`edit/${category.id}`} className={styleCategory.buttonDetail}>
                                            <button><FontAwesomeIcon icon={faEye} className='m-0' /></button>
                                        </Link>

                                        <Link to={`edit/${category.id}`} >
                                            <button className={styleCategory.buttonUpdate}><FontAwesomeIcon icon={faEdit} className='m-0' /></button>
                                        </Link>
                                        {<button onClick={() => actionCategories.deleteCaregory(category.id)} className={styleCategory.buttonDelete}>
                                            {category.isDeleting
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <span><FontAwesomeIcon icon={faDeleteLeft} className='m-0' /></span>
                                            }
                                        </button>}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
            {loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {categories.length === 0 &&
                <div className="text-center m-5">
                    <h4>You don't have any categories created yet</h4>
                    <Link to="add" className=' py-2'>
                        <button className={styleCategory.buttonAddCategory}>Add Category</button>
                    </Link>
                </div>
            }
            {loading?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading  {categories.error}</div>

                </div>
            }
        </div>
    );
}

export { Categories };