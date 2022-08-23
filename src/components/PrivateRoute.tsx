import React, {FC} from "react"
import MyContext from "../context/MyContext";

interface PrivateRouteProps {
    component: FC<any>;
    default: FC<any>;
    path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({component: Component, default: DefaultComponent}) => {

    const {user} = React.useContext(MyContext)

    if (user === '') {
        return <DefaultComponent/>
    }
    return <Component/>
}
export default PrivateRoute
