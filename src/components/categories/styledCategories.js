import tw from "twin.macro";
import styled from "styled-components";

export const ContentFilter = tw.div`
grid
grid-cols-1
md:grid-cols-2
`
export const TableCategories = tw.table`
table-fixed 
border
border-slate-200
`
export const TableBodyCategory = styled.tr`
    background-color: ${(props) => props.variant % 2  ? '#e2e8f0' : "white"};
    ${tw`
    border 
    border-slate-200 
    `}
`
export const TableHeardCategory = styled.th`
width: ${(props) => props.size};
${tw`px-2`}
`

export const TableContentCategory = tw.td`  
px-2
`
export const TableContentButtons = tw.div`  
flex
flex-nowrap
space-x-1
`
export const SearchCategory = tw.input`
py-2
font-semibold
mb-3
mt-3
border-solid	
border-2 
border-sky-500
rounded-full
px-2

w-full
`