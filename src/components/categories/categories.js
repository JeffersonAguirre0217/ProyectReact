import './categories.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye, faL } from '@fortawesome/free-solid-svg-icons';

import { storeApp } from '../../zustand/storeZustand';
import { actionCategories } from '../../zustand/categoryZustand';
import { Alert } from '../shared/alert/alert'
import { LinkButton, DeliteButton, InfoButton, UpdateButton } from '../shared/styledComponent/styledButton';
import { ContainerGeneral, ContainerSpace, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { ContentFilter, SearchCategory, TableBodyCategory, TableCategories, TableContentButtons, TableContentCategory, TableHeardCategory } from './styledCategories';
import { get } from 'react-hook-form';

function Categories() {
    const [loading, setIsLoading] = useState(true)
    //let categories = null
    
    const [categories, setCategories] = useState(null);
    const [resultSearch, setResultSearch] = useState("ALL");
    const [searchParam] = useState(["name"]);

    useEffect(() => {
        getAllCategories()
    }, []);

    async function getAllCategories(){
        const items = await actionCategories.getAll()
        setCategories(items.categories.list)
        setIsLoading(items.categories.loading)
    }

    async function filterCategoy(e) {
        setIsLoading(true)
        let search = await actionCategories.filterByCategory(e.target.value)
        setCategories(search)
        setIsLoading(false)
    }

    return (
        <ContainerGeneral>
            <ContentFilter>
                <ContainerTitle>Categories</ContainerTitle>
                <label htmlFor="search-form">
                    <SearchCategory
                        type="search"
                        placeholder="Search Category"
                        onChange={(filterCategoy)}
                    />
                </label>
            </ContentFilter>
            <Alert />
            {categories &&
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
                                            <DeliteButton onClick={()=>actionCategories.deleteCaregory(category.id)}>
                                                <FontAwesomeIcon icon={faDeleteLeft} />
                                            </DeliteButton>
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
            {!categories &&
                <div className="text-center m-5">
                    <h4>You don't have any categories created yet</h4>
                    <LinkButton to="add">
                        Add Category
                    </LinkButton>
                </div>
            }
        </ContainerGeneral>
    );
}

export { Categories };