import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/auth-slice-actions";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function MainPage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function logout() {
        dispatch(logoutUser());
    }

    return (
        <>
            <div><h1>Список дел</h1></div>
            <div><h3> User: {user.username}</h3></div>
            <a class="btn btn-primary" href="#" onClick={logout}>Logout</a>

            <TodoList/>
        </>
    )
}