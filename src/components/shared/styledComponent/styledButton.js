import { Link } from "react-router-dom";
import tw from "twin.macro";

const CustonButom = tw.button`
text-white
w-auto 
px-4
`
export const PrimaryButton = tw(CustonButom)`
rounded-full 
bg-violet-500 
hover:bg-violet-600 
active:bg-violet-700 
focus:outline-none 
focus:ring
focus:ring-violet-300 
`
export const LinkButton =tw(Link)`
rounded-full
py-2
px-10
no-underline
text-white
bg-violet-500 
hover:bg-violet-600 
active:bg-violet-700
focus:ring-violet-300  
focus:outline-none 
focus:ring
`
export const UpdateButton =tw(LinkButton)`
rounded-md
py-1
px-2
bg-blue-400
hover:bg-blue-500 
active:bg-blue-700
focus:ring-blue-300 
`

export const DeliteButton =tw(PrimaryButton)`
rounded-md
text-white
py-1
px-2
bg-red-400
hover:bg-red-500 
active:bg-red-700
focus:ring-red-300 
`
export const InfoButton =tw(LinkButton)`
rounded-md
py-1
px-2
bg-yellow-400
hover:bg-yellow-500 
active:bg-yellow-700
focus:ring-yellow-300 
`
export const CancelButton = tw(LinkButton)`
rounded-sm
text-white
py-1
px-2
bg-red-400
hover:bg-red-500 
active:bg-red-700
focus:ring-red-300 
`

export const ResetButton =tw(PrimaryButton)`
rounded-sm
py-1
px-2
bg-yellow-400
hover:bg-yellow-500 
active:bg-yellow-700
focus:ring-yellow-300 
`
export const SaveButton =tw(PrimaryButton)`
rounded-sm
py-1
px-2
bg-blue-400
hover:bg-blue-500 
active:bg-blue-700
focus:ring-blue-300 
`