import React from "react"
import { Route, Routes } from 'react-router-dom'

import Header from "../shared/Header";
import SideBar from "../shared/SideBar";
import Home from "./Home";

import AllStore from "../store/AllStore"
import DetailStore from "../store/DetailStore";
import AddStore from "../store/AddStore";
import UpdateStore from "../store/UpdateStore";

import LoginProfile from "./LoginProfile";
import AllAdmin from "../admin/AllAdmin";
import DetailAdmin from "../admin/DetailAdmin";
import AddAdmin from "../admin/AddAdmin";
import UpdateAdmin from "../admin/UpdateAdmin";
import UpdatePassword from "../admin/UpdatePassword";

import AllCategory from "../category/AllCategory";
import AddCategory from "../category/AddCategory";
import DetailCategory from "../category/DetailCategory";

import '../../assets/css/dashboard.css'
import UpdateCategory from "../category/UpdateCategory";

function DashBoard() {

    return (
        <React.Fragment>
            <Header />
            <SideBar />
            <main className="mt-3 pt-2">
                <div className="container-fluid">
                    <Routes>
                        <Route exact path='/' element={<Home />}></Route>
                        /* Admin Info Goes From Here */
                        <Route exact path='/admin/loginprofile' element={<LoginProfile />}></Route>
                        <Route exact path='/admin/alladmin' element={<AllAdmin />}></Route>
                        <Route exact path='/admin/detailadmin/:AdminId' element={<DetailAdmin />}></Route>
                        <Route exact path='/admin/addadmin' element={<AddAdmin />}></Route>
                        <Route exact path='/admin/updateadmin/:AdminId' element={<UpdateAdmin />}></Route>
                        <Route exact path='/admin/updatepassword/:AdminId' element={<UpdatePassword />}></Route>
                        /* Store Info Goes From Here */
                        <Route exact path='/store/allstore' element={<AllStore />}></Route>
                        <Route exact path='/store/detailstore/:StoreId' element={<DetailStore />}></Route>
                        <Route exact path='/store/addstore' element={<AddStore />}></Route>
                        <Route exact path='/store/updatestore/:StoreId' element={<UpdateStore />}></Route>

                        /* Category Info Goes From Here */
                        <Route exact path='/category/allcategory' element={<AllCategory />}></Route>
                        <Route exact path='/category/detailcategory/:CategoryId' element={<DetailCategory />}></Route>
                        <Route exact path='/category/addcategory' element={<AddCategory />}></Route>
                        <Route exact path='/category/updatecategory/:CategoryId' element={<UpdateCategory />}></Route>
                    </Routes>
                </div>
            </main>
        </React.Fragment>
    )
}

export default DashBoard