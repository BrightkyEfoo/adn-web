import {configureStore} from "@reduxjs/toolkit"
import NavBarReducer from "../features/NavBarSlice"
import EventEditReducer from "../features/EventEditSlice"
import UserEditReducer from "../features/UserEditSlice"

const store = configureStore({
    reducer : {
        NavBar : NavBarReducer,
        EventEdit : EventEditReducer,
        UserEdit : UserEditReducer,
    }
})
export default store