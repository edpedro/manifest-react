import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { FileUp, Check, AlertCircle, Download } from "lucide-react";

export default function ExpeditionExcel() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError("");
    setSuccess(false);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Verificar se é um arquivo Excel (.xlsx ou .xls)
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Por favor, selecione apenas arquivos Excel (.xlsx ou .xls)");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleProcessFile = () => {
    if (!file) {
      setError("Por favor, selecione um arquivo antes de processar");
      return;
    }

    // Aqui você processaria o arquivo
    console.log("Processando arquivo:", file);
    setSuccess(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex w-full py-4 ml-2">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary cursor-pointer" />
            <span className="text-sm text-muted-foreground font-medium">
              Planilha modelo
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
          <Card className="w-full max-w-lg shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Importação Expedição
              </CardTitle>
              <CardDescription>
                Selecione um arquivo Excel para importar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-blue-600 hover:underline">
                    Selecionar arquivo Excel
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">{file.name}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Arquivo processado com sucesso!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleProcessFile}
                disabled={!file}
                className="w-full"
                size="lg"
              >
                Processar Arquivo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
