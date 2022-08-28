import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { getUser} from "../../redux/Actions";
import { NavLink } from "react-router-dom";
import Cargando from "../Loading/loading";
import  "./userdetail.css";
function UserDetail({userDetail,match}){
    const id =  match.params.id
    const[load, setLoad] = useState(true);
    const dispatch = useDispatch();
    const UserDetailCompleted = useSelector(state => state.userDetail)
    useEffect(() => {
        dispatch(getUser(id)).then(() => setLoad(false))
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
     if(load){
         return <Cargando/>
     }
     console.log(UserDetailCompleted.platforms)
    return(
        <div className="CardUser">
            <h3 className="title">{UserDetailCompleted.name}</h3>
            <div className="DetailUser">
    
                <div className="detailInfo">
                    {/* Me traigo la descripcion */}
                    <div className="descripcion">{UserDetailCompleted.description_raw ? UserDetailCompleted.description_raw : UserDetailCompleted.description}</div>
                    <br />
                    <div>
                        <span className="rating">{UserDetailCompleted.rating}</span>
                    </div>
                    <br />
                        <NavLink to={'/home'} className={"btn"}>
                          <span>↵ Volver Home</span>
                        </NavLink>
                </div>
            </div>
        </div>
    )    
}
export default UserDetail