import React, { FormEvent, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Loader2 } from "lucide-react";
import { useLoading } from "../../contexts/hooks/Loanding";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsers } from "../../contexts/hooks/User";
import { ResetPasswordUser } from "../../types";
import { useSearchParams } from "react-router-dom";

export function ResetPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { resetPassword } = useUsers();
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    passwordContra: "",
  });

  const [searchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, passwordContra } = formData;

    if (!password || !passwordContra) {
      toast.error("Favor preencher todos os dados!");
      return;
    }

    if (password !== passwordContra) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      const token = searchParams.get("token") ?? "";

      if (!token) {
        navigate("/login");
      }

      const data: ResetPasswordUser = {
        token,
        password,
      };

      await resetPassword(data);
      setFormData({ password: "", passwordContra: "" });
      navigate("/login"); // redireciona para login, por exemplo
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl">
                Recuperar Senha
              </CardTitle>
              <CardDescription>
                Digite e confirme a nova senha abaixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Nova Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="passwordContra">Confirmar Senha</Label>
                    <Input
                      id="passwordContra"
                      name="passwordContra"
                      type="password"
                      value={formData.passwordContra}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Aguarde..." : "Alterar Senha"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
