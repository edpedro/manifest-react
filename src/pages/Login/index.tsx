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
import { useAuth } from "../../contexts/hooks/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useLoading } from "../../contexts/hooks/Loanding";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { signIn, authenticated, authData } = useAuth();
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (authenticated) {
    if (authData?.type === "driver") {
      navigate("/romaneio");
    } else {
      navigate("/");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Favor preencher todos dados!");
      return;
    }

    try {
      await signIn(formData.username, formData.password);
      // Limpa os campos após o login bem-sucedido
      setFormData({
        username: formData.username.toLowerCase(),
        password: "",
      });
    } catch (error) {
      // Mantém os campos preenchidos em caso de erro para o usuário corrigir
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl">
                Login
              </CardTitle>
              <CardDescription>
                Digite seu usuário abaixo para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className="lowercase"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
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
                    {isLoading ? "" : "Entrar"}
                  </Button>
                </div>
                <div className="mt-4 flex justify-center gap-6 text-sm text-center">
                  <span>
                    Esqueceu a senha?{" "}
                    <a href="/reset" className="underline underline-offset-4">
                      Recuperar senha
                    </a>
                  </span>
                  <span>
                    Não tem uma conta?{" "}
                    <a
                      href="/register"
                      className="underline underline-offset-4"
                    >
                      Criar conta
                    </a>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
