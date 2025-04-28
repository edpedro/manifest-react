import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Painel from "../pages/Painel";
import Search from "../pages/Search";
import ImportExcel from "../pages/ImportExcel";
import ExportExcel from "../pages/ExportExcel";
import ExpeditionExcel from "../pages/ExpeditionExcel";
import { LoginForm } from "../pages/Login";
import { RegisterForm } from "../pages/Register";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<Painel />} />
      <Route path="/search" element={<Search />} />
      <Route path="/import" element={<ImportExcel />} />
      <Route path="/export" element={<ExportExcel />} />
      <Route path="/expedition" element={<ExpeditionExcel />} />
    </Router>
  );
};

export default Routes;
