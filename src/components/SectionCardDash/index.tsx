import {
  Loader2,
  FileText,
  Package,
  Truck,
  Timer,
  Banknote,
} from "lucide-react";
import React, { useEffect } from "react";
import { useShipment } from "../../contexts/hooks/Shipment";
import { useLoading } from "../../contexts/hooks/Loanding";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function SectionCardDash() {
  const { dashData, loadDashboard } = useShipment();
  const { isDashboard } = useLoading();

  useEffect(() => {
    loadDashboard();
  }, []);

  const cardData = [
    {
      title: "Total Notas Fiscais",
      value: dashData?.TotalSupply,
      icon: FileText,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
    {
      title: "Total STs",
      value: dashData?.TotalSt,
      icon: Package,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
    {
      title: "Total Expedição",
      value: dashData?.TotalExpedition,
      icon: Truck,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
    {
      title: "Tempo Medio Exp",
      value: "2,2",
      icon: Timer,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
    {
      title: "Soma Valor",
      value: dashData?.SomaValeu?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: Banknote,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
  ];

  return (
    <div className="-mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              className="rounded-2xl shadow-sm bg-white border border-gray-100 p-2 w-full min-w-[150px] h-[80px] transition-all duration-300 hover:shadow-md hover:-translate-y-1 group relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${card.color}`}
              ></div>

              <CardHeader className="p-1 space-y-1 relative text-center">
                <div className="absolute -top-1 -right-1">
                  <div
                    className={`w-8 h-8 ${card.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm`}
                  >
                    <IconComponent className={`h-4 w-4 ${card.iconColor}`} />
                  </div>
                </div>

                <div className="pt-2">
                  <CardDescription className="font-medium text-xs  text-gray-600 flex justify-center items-center gap-1.5">
                    {card.title}
                    {isDashboard && (
                      <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
                    )}
                  </CardDescription>

                  <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-1">
                    {card.value || "-"}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
