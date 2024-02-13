import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PreviewPage from "./Pages/PreviewPage";
import Page from "./Pages/Profile/LinkPage/Page";
import Applayout from "./Applayout";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Store, { persistor } from "./Store/Store";
import { Provider } from "react-redux";
import  { Toaster } from 'react-hot-toast';
import {  QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Async/queryStore";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend"
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoutes from "./utilitis/ProtectedRoutes";

const router = createBrowserRouter([
  {path:"/",element:<SignIn/>,
  children:[
    {path:"/",element:<Login/>},
    {path:"/createAccount",element:<CreateAccount/>}
  ]},
  {
    path: "",
    element: 
    <ProtectedRoutes>
      <Applayout />
    </ProtectedRoutes>, 
    children: [
      { path: "/linkPage", element: <Page /> },
      { path: "/profilePage", element: <ProfilePage /> },
    ],
  },
  { path: "/previewPage/:userId", element: <PreviewPage /> },
]);


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
     <QueryClientProvider client={queryClient}>
    < Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />;
      </PersistGate>
     <Toaster/>
 </Provider>
 </QueryClientProvider>
 </DndProvider>)
}

export default App;
