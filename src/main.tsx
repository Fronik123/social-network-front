import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"

import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Auth } from "./pages/auth"
import { Layout } from "./components/layout"
import { Posts } from "./pages/posts"
import { CurrentPost } from "./pages/current-post"
import { UserProfile } from "./pages/user-profile"
import { Followrs } from "./pages/followrs"
import { Following } from "./pages/following"
import { AuthGuard } from "./features/user/authGuard"

const router = createBrowserRouter(
  [
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Posts />,
        },
        {
          path: "posts/:id",
          element: <CurrentPost />,
        },
        {
          path: "users/:id",
          element: <UserProfile />,
        },
        {
          path: "followers",
          element: <Followrs />,
        },
        {
          path: "following",
          element: <Following />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}