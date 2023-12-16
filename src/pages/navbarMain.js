import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function NavBarMain(){

    return(<>
    
        <nav className="navMain">
            <Link to="/">
                <div className="store-name">Store Page</div>
            </Link>
            <ul>
                <CustomLink to="/">Order List</CustomLink>
                <CustomLink to="/customer">Customer</CustomLink>
                <CustomLink to="/item">Item</CustomLink>
            </ul>
        </nav>
    
    </>)
}

function CustomLink({ to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return (

        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    )
}