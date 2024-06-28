import tw from "twin.macro";
import styled from "styled-components";
import { LinkButton, PrimaryButton } from "../shared/styledComponent/styledButton";

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