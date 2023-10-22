/**
 *
 *      <---***Thinge bundle doing for us***--->
 * Create a server
 * HRM- HOt Module Reloading
 * File Watcher algorithum -C++
 * Building
 * Minify
 * Cleaning our Code
 * Dev and Production Build
 * Super fast build Algorithum
 * Image Optimization
 * Caching while development (image should in project )
 * Compression
 * Compatible with older version of browser
 * HTTPS on dev
 * parcel manages port number
 * Consistent hashing Algorithum
 * Zero configuration
 *
 */

import React, { Suspense, lazy, Profiler, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Error,
  Header,
  Footer,
  Body,
  About,
  Contact,
  RestaurantMenu,
  RestrauntCard,
  Shimmer,
  Cart,
} from "./components";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // Aggregate or log render timings...
}

const About1 = lazy(() => import("./components/About")); //Dynamic Loading

const AppLayout = () => {
  //auth code
  useEffect(() => {
    const data = {
      name: "Sankalp",
    };

    setUseInfo(data.name);
  }, []);
  const [userInfo, setUseInfo] = useState();
  return (
    <>
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userInfo }}>
          <Profiler id="Sidebar" onRender={onRender}>
            <Header />
          </Profiler>
          <Profiler id="Sidebar" onRender={onRender}>
            <Outlet />
          </Profiler>
          <Profiler id="Sidebar" onRender={onRender}>
            <Footer />
          </Profiler>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Body className="flex flex-wrap m-2 p-1 max-w-screen-2xl justify-center" />
          </Suspense>
        ),
      },
      {
        path: "/About",
        element: (
          <Suspense>
            <About1 />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: <Body />,
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense>
            <Cart />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
