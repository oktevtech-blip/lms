import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Borrowers from "../pages/Borrowers";
import Loans from "../pages/Loans";
import Payments from "../pages/Payments";
import AddBorrower from "../pages/AddBorrower";
import ViewBorrower from "../pages/ViewBorrower";
import CreateLoan from "../pages/CreateLoan";
import ViewLoan from "../pages/ViewLoan";
import RecordPayment from "../pages/RecordPayment";
import Reports from "../pages/Reports";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Page - No Sidebar */}
      <Route path="/" element={<Login />} />

      {/* All Protected Pages */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/borrowers"
        element={
          <MainLayout>
            <Borrowers />
          </MainLayout>
        }
      />

      <Route
        path="/borrowers/add"
        element={
          <MainLayout>
            <AddBorrower />
          </MainLayout>
        }
      />

      <Route
        path="/borrowers/view/:id"
        element={
          <MainLayout>
            <ViewBorrower />
          </MainLayout>
        }
      />

      <Route
        path="/loans"
        element={
          <MainLayout>
            <Loans />
          </MainLayout>
        }
      />

      <Route
        path="/loans/create"
        element={
          <MainLayout>
            <CreateLoan />
          </MainLayout>
        }
      />

      <Route
        path="/loans/view/:id"
        element={
          <MainLayout>
            <ViewLoan />
          </MainLayout>
        }
      />

      <Route
        path="/payments"
        element={
          <MainLayout>
            <Payments />
          </MainLayout>
        }
      />

      <Route
        path="/payments/create"
        element={
          <MainLayout>
            <RecordPayment />
          </MainLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />

      <Route
        path="/users"
        element={
          <MainLayout>
            <Users />
          </MainLayout>
        }
      />

      <Route
        path="/users/add"
        element={
          <MainLayout>
            <AddUser />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;