import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PreviewPage from "./Pages/PreviewPage";
import Page from "./Pages/Profile/LinkPage/Page";
import Applayout from "./Applayout";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";

const router = createBrowserRouter([
  {path:"/",element:<SignIn/>,
  children:[
    {path:"/",element:<Login/>},
    {path:"/createAccount",element:<CreateAccount/>}
  ]},
  {
    path: "",
    element: <Applayout />,
    children: [
      { path: "/linkPage", element: <Page /> },
      { path: "/profilePage", element: <ProfilePage /> },
    ],
  },
  { path: "/previewPage", element: <PreviewPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
