import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PreviewPage from "./Pages/PreviewPage";
import Page from "./Pages/Profile/LinkPage/Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
  },
  { path: "profilePage", element: <ProfilePage /> },
  { path: "previewPage", element: <PreviewPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
