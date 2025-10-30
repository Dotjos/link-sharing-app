import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth.js";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../Store/AuthSlice.js";

function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  // const { status } = getCurrentAccountAuth();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.AuthSlice.isAuthenticated
  );

  console.log(isAuthenticated);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  if (isAuthenticated) return children;
  return children;
}

export default ProtectedRoutes;
