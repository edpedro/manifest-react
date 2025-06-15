import { Loader2, FileText, Users } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useLoading } from "../../../contexts/hooks/Loanding";
import { useDashboard } from "../../../contexts/hooks/Dashboard";

export function SectionDriverPendingInvoices() {
  const { dashboardData } = useDashboard();
  const { isDashboard } = useLoading();

  const cardData = [
    {
      title: "Total de notas acima de 03 dias",
      value: dashboardData?.invoiceTotal3,
      icon: FileText,
      color: "from-red-400 to-red-400",
      bgColor: "bg-gray-50",
      iconColor: "text-red-400",
    },
    {
      title: "Total Motorista",
      value: dashboardData?.driver,
      icon: Users,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
    },
  ];

  return (
    <div className="px-2 sm:px-1 py-2">
      {/* Mobile: Stack vertical, Tablet+: Grid horizontal */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              className="rounded-2xl shadow-sm bg-white border border-gray-100 p-2 w-full sm:min-w-[300px] lg:min-w-[360px] h-[70px] sm:h-[80px] transition-all duration-300 hover:shadow-md hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Barra colorida no topo */}
              <div
                className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${card.color}`}
              ></div>

              <CardHeader className="p-1 space-y-1 relative text-center">
                <div className="absolute -top-1 -right-1">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${card.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm`}
                  >
                    <IconComponent
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${card.iconColor}`}
                    />
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <CardDescription className="font-medium text-xs sm:text-xs text-gray-600 flex justify-center items-center gap-1.5 leading-tight">
                    <span className="text-center">{card.title}</span>
                    {isDashboard && (
                      <Loader2 className="h-3 w-3 animate-spin text-gray-400 flex-shrink-0" />
                    )}
                  </CardDescription>

                  <CardTitle className="text-base sm:text-lg lg:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1">
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
