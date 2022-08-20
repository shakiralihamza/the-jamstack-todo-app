import React, {FC} from 'react';
import Header from "./Header";
import AddTodo from "./AddTodo";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => (
    <>
        <Header/>
        {children}
    </>
);

export default Layout;
