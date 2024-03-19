import React, { lazy } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

import { Layout, Row, Spin } from "antd";
import PropTypes from "prop-types";
import AuthProvider, { useAuth } from "./contexts/AuthContext";

const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

const AuthRedirect = ({ children, isAuthRoute }) => {
  const auth = useAuth();
  if (auth.token && !isAuthRoute) {
    return <Navigate to={"/home"} />;
  } else if (!auth.token && isAuthRoute) {
    return <Navigate to={"/sign-in"} />;
  }

  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.element,
  isAuthRoute: PropTypes.bool,
};

function App() {
  const auth = useAuth();
  const defaultNavigate = (
    <Navigate to={auth?.token ? "/dashboard" : "/sign-in"} />
  );

  const getAuthWrapper = (component, isAuthRoute = true) => {
    return (
      <AuthRedirect isAuthRoute={isAuthRoute}>
        <React.Suspense
          fallback={
            <Row
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </Row>
          }
        >
          <Layout
            style={{
              height: "100vh",
              width: "100%",
              padding: 0,
            }}
          >
            {component}
          </Layout>
        </React.Suspense>
      </AuthRedirect>
    );
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to={"/sign-in"} />,
        },
        {
          path: "/sign-in",
          element: getAuthWrapper(<SignIn />, false),
        },
        {
          path: "/sign-up",
          element: getAuthWrapper(<SignUp />, false),
        },
        {
          path: "*",
          element: defaultNavigate,
        },
      ],
    },
    {
      path: "/home",
      element: getAuthWrapper(<AuthLayout />, true),
      children: [
        {
          index: true,
          element: getAuthWrapper(<Home />, true),
        },
      ],
    },
    {
      path: "/user-profile",
      element: getAuthWrapper(<AuthLayout />, true),
      children: [
        {
          index: true,
          element: getAuthWrapper(<Profile />, true),
        },
      ],
    },
    {
      path: "*",
      element: defaultNavigate,
    },
  ]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
