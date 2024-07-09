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

export  const BodyCardProduct = tw.div`
grid
grid-cols-2
`
export  const ExtraInfoCardProduct = tw.div`
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