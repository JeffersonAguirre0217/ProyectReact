import tw from "twin.macro";
import { Link, NavLink } from "react-router-dom";

export const ContentLayout = tw.div`
grid 
grid-cols-1 
sm:grid-cols-5  
md:grid-cols-5
`
export const Sidebar = tw.div`
bg-slate-900 
p-0
`

export const ContentSidebar = tw.ul`
m-0 
p-0
h-screen
`

export const ItemsSidebar = tw.li(Link)`
flex 
grid-cols-1
w-full 
text-white
hover:bg-gray-200
px-4
py-2
no-underline
`

export const ContentPage = tw.div`
col-span-12 
md:col-span-4 
px-3
`

// ----------------navbar----------------
export const ContentNavbar = tw.nav`
bg-slate-900 
text-white
h-20
`

export const Navbar = tw.div`
flex
pt-4
space-x-6
text-xl
`

export const MenuMovil = tw.button`
sm:invisible
sm:pl-4
`

export const ButtonDashboars= tw.button(NavLink)`
no-underline
text-white
`

