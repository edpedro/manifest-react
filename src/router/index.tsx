import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Search from "../pages/Search";
import ImportExcel from "../pages/ImportExcel";
import ExportExcel from "../pages/ExportExcel";
import ExpeditionExcel from "../pages/ExpeditionExcel";
import { LoginForm } from "../pages/Login";
import { RegisterForm } from "../pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";
import Shipping from "../pages/Shipping";
import { ShippingInvoice } from "../pages/ShippingInvoice";
import Mail from "../pages/Mail";
import User from "../pages/User";
import { ResetPassword } from "../pages/ResetPassword";
import { ResetMail } from "../pages/ResetMail";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset" element={<ResetMail />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/import" element={<ImportExcel />} />
        <Route path="/export" element={<ExportExcel />} />
        <Route path="/expedition" element={<ExpeditionExcel />} />
        <Route path="/romaneio" element={<Shipping />} />
        <Route path="/romaneio/invoice/:id" element={<ShippingInvoice />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Router>
  );
};

export default Routes;
