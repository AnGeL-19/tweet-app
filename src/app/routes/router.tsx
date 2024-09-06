import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import { LoadingPage } from "../components/shared/LoadingPage";



const AuthLayout = lazy(() => import('../pages/layout/AuthLayout'));
const MainLayout = lazy(() => import('../pages/layout/MainLayout'));
const ConfigurationsLayout = lazy(() => import('../pages/layout/ConfigurationsLayout'));
const ChatGroupLayout = lazy(() => import('../pages/layout/ChatGroupLayout'));

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
            path: "account/",
            element: (
              <Suspense fallback={<LoadingPage/>}>
                <ConfigurationsLayout />
              </Suspense>
              ),
            children: [
              {
                index: true,
                path: "edit",
                async lazy() {
                  let { EditProfilePage } = await import("../pages/configurations/EditProfilePage");
                  return { Component: EditProfilePage };
                },
              },
              {
                path: "notifications",
                async lazy() {
                  let { NotificationPage } = await import("../pages/configurations/NotificationPage");
                  return { Component: NotificationPage };
                },
              },
              {
                path: "privacity",
                async lazy() {
                  let { PrivacityPage } = await import("../pages/configurations/PrivacityPage");
                  return { Component: PrivacityPage };
                },
              },
              {
                path: "themes",
                async lazy() {
                  let { ThemePage } = await import("../pages/configurations/ThemePage");
                  return { Component: ThemePage };
                },
              },
            ]
          },
          {
            path: "chats/",
            element: (
              <Suspense fallback={<LoadingPage/>}>
                <ChatGroupLayout />
              </Suspense>
              ),
              children: [
                {
                  index: true,
                  path: "",
                  async lazy() {
                    let { ChatPage } = await import("../pages/chats/ChatPage");
                    return { Component: ChatPage };
                  },
                },
                {
                  index: true,
                  path: ":name_user",
                  async lazy() {
                    let { ChatWhitUser } = await import("../pages/chats/ChatWhitUser");
                    return { Component: ChatWhitUser };
                  },
                },
              ]
          }
        
    ]
  }
]);

