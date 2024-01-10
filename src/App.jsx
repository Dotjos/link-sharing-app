import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PreviewPage from "./Pages/PreviewPage";
import Page from "./Pages/Profile/LinkPage/Page";
import Applayout from "./Applayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Applayout />,
    children: [
      { path: "previewPage", element: <PreviewPage /> },
      { path: "/", element: <Page /> },
    ],
  },
  { path: "profilePage", element: <ProfilePage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
