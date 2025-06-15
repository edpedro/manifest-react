import { Loader2, FileText, Package, Users } from "lucide-react";
import React, { useEffect } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useShipment } from "../../../contexts/hooks/Shipment";
import { useLoading } from "../../../contexts/hooks/Loanding";

export function SectionDriverPendingInvoices() {
  const { dashData, loadDashboard } = useShipment();
  const { isDashboard } = useLoading();

  useEffect(() => {
    loadDashboard();
  }, []);

  const cardData = [
    {
      title: "Total de notas acima de 03 dias",
      value: dashData?.TotalSupply,
      icon: FileText,
      color: "from-red-400 to-red-400",
      bgColor: "bg-gray-50",
      iconColor: "text-red-400",
    },
    {
      title: "Total Motoristas",
      value: dashData?.TotalSt,
      icon: Users,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
  ];

  return (
    <div className="px-4 py-2">
      {/* Responsivo: horizontal scroll em mobile, grid em telas médias e maiores */}
      <div className="flex flex-col gap-4">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              className="rounded-2xl shadow-sm bg-white border border-gray-100 p-2 w-full min-w-[160px] h-[80px] transition-all duration-300 hover:shadow-md hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Barra colorida no topo */}
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

                  <CardTitle className="text-lg md:text-2xl font-bold text-gray-800 mt-1">
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
