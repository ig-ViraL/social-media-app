import React from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import { Col, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const AuthRedirect = ({ children, isAuthRoute }) => {
  const auth = useAuth();
  if (auth.token && !isAuthRoute) {
    return <Navigate to={"/dashboard"} />;
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
              <Col span={24}>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              </Col>
            </Row>
          }
        >
          {component}
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
          element: getAuthWrapper(<SignIn />, false),
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
