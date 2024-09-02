import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import { LoadingPage } from "../components/shared/LoadingPage";


const AuthLayout = lazy(() => import('../pages/layout/AuthLayout'));
const MainLayout = lazy(() => import('../pages/layout/MainLayout'));

export const router = createBrowserRouter([
  {
    path: "auth",
    element: (
      <Suspense fallback={<LoadingPage/>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
        {
            index: true,
            path: "login",
            async lazy() {
              let { LoginPage } = await import("../pages/auth/LoginPage");
              return { Component: LoginPage };
            },
        },
        {
            path: "register",
            async lazy() {
              let { RegisterPage } = await import("../pages/auth/RegisterPage");
              return { Component: RegisterPage };
            },
        },
    ]
  },
  {
    path: '',
    element: (
      <Suspense fallback={<LoadingPage/>}>
        <MainLayout />
      </Suspense>
      )
    ,
    children: [
          {
            index: true,
            path: "/",
            async lazy() {
              let { HomePage } = await import("../pages/home/HomePage");
              return { Component: HomePage };
            },
          },
          {
            path: "explore",
            async lazy() {
              let { ExplorePage } = await import("../pages/explore/ExplorePage");
              return { Component: ExplorePage };
            },
          },
          {
            path: "bookmarks",
            async lazy() {
              let { BookMarksPage } = await import("../pages/bookmarks/BookMarksPage");
              return { Component: BookMarksPage };
            },
          },
          {
            path: "profile/:id",
            async lazy() {
              let { ProfilePage } = await import("../pages/profile/ProfilePage");
              return { Component: ProfilePage };
            },
          },
          {
            path: "account/edit/",
            async lazy() {
              let { ConfigurationPage } = await import("../pages/configurations/ConfigurationPage");
              return { Component: ConfigurationPage };
            },
          },
    ]
  }
]);

