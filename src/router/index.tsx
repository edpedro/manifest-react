import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Painel from "../pages/Painel";
import Search from "../pages/Search";
import ImportExcel from "../pages/ImportExcel";
import ExportExcel from "../pages/ExportExcel";
import ExpeditionExcel from "../pages/ExpeditionExcel";
import { LoginForm } from "../pages/Login";
import { RegisterForm } from "../pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Painel />} />
        <Route path="/search" element={<Search />} />
        <Route path="/import" element={<ImportExcel />} />
        <Route path="/export" element={<ExportExcel />} />
        <Route path="/expedition" element={<ExpeditionExcel />} />
      </Route>
    </Router>
  );
};

export default Routes;
