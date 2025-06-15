import {
  Loader2,
  FileText,
  Package,
  Truck,
  Timer,
  Banknote,
} from "lucide-react";
import { useLoading } from "../../contexts/hooks/Loanding";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useDashboard } from "../../contexts/hooks/Dashboard";

const formatLargeNumber = (value, isCurrency = false) => {
  if (!value) return "-";

  const num = parseFloat(value);

  if (num >= 1000000000) {
    const formatted = (num / 1000000000).toFixed(1);
    return isCurrency ? `R$ ${formatted} Bi` : `${formatted}B`;
  } else if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return isCurrency ? `R$ ${formatted} Mi` : `${formatted}M`;
  } else if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return isCurrency ? `R$ ${formatted} K` : `${formatted}K`;
  }

  if (isCurrency) {
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return num.toString();
};

export function SectionCardDash() {
  const { dashboardData } = useDashboard();
  const { isDashboard } = useLoading();

  const cardData = [
    {
      title: "Total Notas Fiscais",
      value: dashboardData?.TotalSupply,
      icon: FileText,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
      isLargeNumber: true,
    },
    {
      title: "Total STs",
      value: dashboardData?.TotalSt,
      icon: Package,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
      isLargeNumber: true,
    },
    {
      title: "Total Expedição",
      value: dashboardData?.TotalExpedition,
      icon: Truck,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
      isLargeNumber: true,
    },
    {
      title: "Tempo Medio Exp",
      value: dashboardData?.media?.toFixed(1),
      icon: Timer,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
      isLargeNumber: false,
    },
    {
      title: "Soma Valor",
      value: dashboardData?.SomaValeu,
      icon: Banknote,
      color: "from-gray-800 to-gray-800",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-800",
      isCurrency: true,
      isLargeNumber: true,
    },
  ];

  return (
    <div className="-mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;

          let displayValue;
          if (card.isLargeNumber) {
            displayValue = formatLargeNumber(card.value, card.isCurrency);
          } else if (card.isCurrency && card.value) {
            displayValue = card.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          } else {
            displayValue = card.value || "-";
          }

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
                  <CardDescription className="font-medium text-xs text-gray-600 flex justify-center items-center gap-1.5">
                    {card.title}
                    {isDashboard && (
                      <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
                    )}
                  </CardDescription>

                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-gray-800 mt-1">
                    {displayValue}
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
