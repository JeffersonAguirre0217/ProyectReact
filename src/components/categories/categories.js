import './categories.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';

import { storeApp } from '../../zustand/storeZustand';
import { actionCategories } from '../../zustand/categoryZustand';
import  { Alert } from '../shared/alert/alert'
import { LinkButton, DeliteButton, InfoButton, UpdateButton } from '../shared/styledComponent/styledButton';
import { ContainerGeneral, ContainerSpace, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { TableBodyCategory, TableCategories, TableContentButtons, TableContentCategory, TableHeardCategory } from './styledCategories';

function Categories() {

    const categories = storeApp(state => state.categories.list);

    const loading = false///storeCategories(state => state.loading)

    useEffect(() => {

    }, []);

    return (
        <ContainerGeneral>
            <ContainerTitle>Categories</ContainerTitle>
            <Alert />
            {categories.length >0 &&
                <div>
                    <LinkButton to="add">Add Category</LinkButton>
                    <ContainerSpace />
                    <TableCategories>
                        <thead>
                            <tr>
                                <TableHeardCategory size={'10%'}>N°</TableHeardCategory>
                                <TableHeardCategory size={'30%'}>Name</TableHeardCategory>
                                <TableHeardCategory size={'30%'}>Description</TableHeardCategory>
                                <TableHeardCategory size={'20%'}></TableHeardCategory>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category, index) =>
                                <TableBodyCategory variant={index} key={index} >
                                    <TableContentCategory >{index + 1}</TableContentCategory>
                                    <TableContentCategory >{category.name}</TableContentCategory>
                                    <TableContentCategory >{category.description}</TableContentCategory>
                                    <TableContentCategory></TableContentCategory>
                                    <TableContentCategory>
                                        <TableContentButtons >
                                        <InfoButton to={`edit/${category.id}`}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </InfoButton>
                                        <UpdateButton to={`edit/${category.id}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </UpdateButton>
                                        {<DeliteButton onClick={() => actionCategories.deleteCaregory(category.id)}>
                                            {category.isDeleting
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <FontAwesomeIcon icon={faDeleteLeft} className='m-0' />
                                            }
                                        </DeliteButton>}
                                        </TableContentButtons>
                                    </TableContentCategory>
                                </TableBodyCategory>
                            )}
                        </tbody>
                    </TableCategories>
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
                    <LinkButton to="add">
                        Add Category
                    </LinkButton>
                </div>
            }
            {loading?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading  {categories.error}</div>

                </div>
            }
        </ContainerGeneral>
    );
}

export { Categories };