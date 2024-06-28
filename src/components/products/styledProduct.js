import tw from "twin.macro";
import { DeliteButton, InfoButton, UpdateButton } from "../shared/styledComponent/styledButton";

export const GridProducts = tw.div`
grid 
grid-cols-3
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