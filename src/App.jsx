import { useState, Suspense, useCallback, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/actions/authActions";

function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaderComplete = useCallback(() => setLoading(false), []);
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);

  // Restore user object on every fresh page load / refresh
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [token, dispatch]);

  return (
    <>
      {loading && <PageLoader onComplete={handleLoaderComplete} />}
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
