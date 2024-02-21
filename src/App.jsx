import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Store from "./Store/Store";
import { Provider } from "react-redux";
import  { Toaster } from 'react-hot-toast';
import PreviewPage from "./Pages/PreviewPage"
import {  QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Async/queryStore";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend"
import ProtectedRoutes from "./utilitis/ProtectedRoutes";
import { Suspense, lazy } from "react";
import RealSpinner from "./Components/RealSpinner";

const ProfilePage=lazy(()=>import("./Pages/Profile/ProfilePage"))
// const PreviewPage=lazy(()=>import("./Pages/PreviewPage"))
const Page=lazy(()=>import("./Pages/LinkPage/Page"))
const Applayout=lazy(()=>import("./Applayout"))
const  SignIn=lazy(()=>import("./Pages/SignIn"))
const Login=lazy(()=>import("./Pages/Login"))
const CreateAccount=lazy(()=>import("./Pages/CreateAccount"))


const router = createBrowserRouter([
  {path:"/",element:
  <Suspense fallback={<RealSpinner/>}>
     <SignIn/>
  </Suspense>
  ,
  children:[
    {path:"/",element:
<Suspense fallback={<RealSpinner/>}>
  <Login/>
</Suspense>

  },
    {path:"/createAccount",element:
    <Suspense fallback={<RealSpinner/>}>
      <CreateAccount/>
    </Suspense>
  }
  ]},
  {
    path: "",
    element: 
    <Suspense fallback={<RealSpinner/>}>
     <ProtectedRoutes>
      <Applayout />
    </ProtectedRoutes>, 
    </Suspense>,
    children: [
      { path: "/linkPage", element: 
    <Suspense fallback={<RealSpinner/>}>
      <Page /> 
    </Suspense>
    },
      { path: "/profilePage", element: 
      <Suspense fallback={<RealSpinner/>}>
        <ProfilePage /> 
      </Suspense>
    },
    ],
  },
  { path: "/previewPage/:userId", element: <PreviewPage/>
 },
]);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
     <QueryClientProvider client={queryClient}>
    < Provider store={Store}>
        <RouterProvider router={router} />
     <Toaster/>
 </Provider>
 </QueryClientProvider>
 </DndProvider>)
}

export default App;
