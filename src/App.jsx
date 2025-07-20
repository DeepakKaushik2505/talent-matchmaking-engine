import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/app-layout";
import { ThemeProvider } from "./components/theme-provider";

// ✅ Pages that are implemented
import HomePage from "./pages/home";
import TalentProfilePage from "./pages/talent-profile";
import AddTalent from "./pages/add-talent";

// ⏳ Coming Soon - Commented for progress clarity
// import SubmitBriefPage from "./pages/submit-brief";
// import MatchResultsPage from "./pages/match-results";
// import FeedbackPage from "./pages/feedback";
// import AdminDashboardPage from "./pages/admin-dashboard";
// import ProtectedRoute from "./components/protected-route";

import "./App.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-talent",
        element: <AddTalent />,
      },
      {
        path: "/talent/:id",
        element: <TalentProfilePage />,
      },
      // {
      //   path: "/submit-brief",
      //   element: <SubmitBriefPage />,
      // },
      // {
      //   path: "/matches",
      //   element: <MatchResultsPage />,
      // },
      // {
      //   path: "/feedback/:matchId",
      //   element: <FeedbackPage />,
      // },
      // {
      //   path: "/admin",
      //   element: (
      //     <ProtectedRoute>
      //       <AdminDashboardPage />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
