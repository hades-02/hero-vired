import { Routes, Route, Navigate } from "react-router-dom";
import AddProgram from "../pages/addProgram";
import Programs from "../pages/Programs/Programs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";
import ViewProgram from "../pages/Programs/ViewProgram";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/myPrograms" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/addProgram"
        element={
          <ProtectedRoute>
            <AddProgram />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myPrograms"
        element={
          <ProtectedRoute>
            <Programs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myPrograms/:id"
        element={
          <ProtectedRoute>
            <ViewProgram />
          </ProtectedRoute>
        }
      />
      <Route
        path="/changePassword"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
