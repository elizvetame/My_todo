import './App.css';
import LoginPage from './pages/LoginPage';
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from './pages/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
    const { userToken } = useSelector((state) => state.auth);

    if (!userToken) {
        return (
            <LoginPage/>
        );
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage/>
        }, {
            path: "/asd",
            element: <MainPage/>
        }]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
