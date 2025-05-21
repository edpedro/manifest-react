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
import { EmailSend } from "../../types";

export function ResetMail({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { sendMailPassword } = useUsers();
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email } = formData;

    if (!email) {
      toast.error("Favor preencher todos os dados!");
      return;
    }

    try {
      const data: EmailSend = {
        email,
      };
      await sendMailPassword(data);
      setFormData({ email });
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
                Email
              </CardTitle>
              <CardDescription>
                Digite qual email precisa recuperar senha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
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
                    {isLoading ? "Aguarde..." : "Enviar"}
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
