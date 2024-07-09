import tw from "twin.macro";
import { DeliteButton, InfoButton, UpdateButton } from "../shared/styledComponent/styledButton";
import styled from "styled-components";

export const ContentFilters = tw.div`
grid
grid-cols-1
md:grid-cols-3
`
export const SearchProducts = tw.input`
font-semibold
border-solid	
border-2 
border-sky-500
rounded-full
px-2
py-1
w-full
`

export const SelectCategories = styled.select`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);

    background-color: var(--bs-body-bg);
    background-clip: padding-box;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const ContentAddButton = tw.div`
md:mt-2
sm:w-full
mb-4
`
export const ContenSelectFilters = tw.div`
md:mx-3
mt-3
md:mt-0
`

export const GridProducts = tw.div`
grid
grid-cols-1 
md:grid-cols-3
gap-6
my-4
`

export const CardProducts = tw.div`
bg-slate-50 
grid 
grid-cols-1
rounded-lg
shadow-3xl
p-3
`

export const CardContentImage = tw.div`
relative 
flex
justify-center
rounded-md
content-center
w-full
h-40
bg-gray-200
mb-5
`

export const ImageProduct = tw.img`
h-40
blur-none
`

export const BodyCardProduct = tw.div`
grid
grid-cols-2
`
export const ExtraInfoCardProduct = tw.div`
grid
grid-cols-2
mb-3
`
export const ContentButtonsProduct = tw.div`
flex
flex-nowrap
justify-end
`

export const ContentButtonsAddUp = tw.div`
space-x-1 
`

export const MoreInfoButtonProduct = tw(InfoButton)`
bg-transparent
text-gray-700
py-0
pt-1
px-1
hover:text-gray-500 
hover:bg-transparent
active:text-gray-500 
focus:ring-gray-500 
`
export const UpdateButtonProduct = tw(UpdateButton)`
bg-transparent
text-gray-700
py-0
pt-1
px-1
hover:text-gray-500 
hover:bg-transparent
active:text-gray-500 
focus:ring-gray-500 
`
export const DeleteButtonProduct = tw(DeliteButton)`
bg-transparent
text-gray-700
py-0
px-1
hover:text-gray-500 
hover:bg-transparent
active:text-gray-500 
focus:ring-gray-500 
`

export const ImgButton = tw.input`
file:bg-violet-500 
file:hover:bg-violet-600 
file:active:bg-violet-700 
file:focus:outline-none 
file:focus:ring 
file:focus:ring-violet-300 
file:text-white w-auto 
file:py-2  
file:rounded-md
`

//-------------------DETAIL PRODUCT -----------

export const CardProductDetail = tw.div`
bg-slate-50 
rounded-lg
shadow-3xl
p-3
`
export const ContentCardProductDetail = tw.div`
grid
grid-cols-1
md:grid-cols-3
p-3
`

export const ContentCardImgProductDetail = tw.div`
p-4
`
export const ContentCardTextProductDetail = tw.div`
grid 
grid-cols-1 
md:grid-cols-2 
md:col-span-2
p-4
`

export const ContentCardButtonProductDetail = tw.div`
px-6
pb-3
`