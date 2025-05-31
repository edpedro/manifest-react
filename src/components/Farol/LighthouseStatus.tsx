import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Status } from "../../types";

const statusMap: Record<
  Status,
  {
    icon: React.ElementType;
    badgeClass: string;
    iconClass: string;
    label: string;
    tooltip: string;
    duration: number;
    pulse?: boolean;
  }
> = {
  gray: {
    icon: CheckCircle,
    badgeClass: "bg-gray-100 text-gray-700 border border-gray-400",
    iconClass: "text-gray-600",
    label: "Farol",
    tooltip: "Não tem notas pendentes",
    duration: 6,
  },
  success: {
    icon: CheckCircle,
    badgeClass: "bg-green-100 text-green-700 border border-green-400",
    iconClass: "text-green-600",
    label: "Farol",
    tooltip: "As notas estão no prazo",
    duration: 3,
  },
  warning: {
    icon: AlertTriangle,
    badgeClass: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    iconClass: "text-yellow-600",
    label: "Farol",
    tooltip: "As notas estão acima de 2 dias",
    duration: 1.5,
    pulse: true,
  },
  error: {
    icon: XCircle,
    badgeClass: "bg-red-100 text-red-700 border border-red-400",
    iconClass: "text-red-600",
    label: "Farol",
    tooltip: "As notas estão acima de 3 dias",
    duration: 1.5,
    pulse: true,
  },
};

interface Props {
  status: Status;
  onClick?: () => void;
}

export function LighthouseStatus({ status, onClick }: Props) {
  const {
    icon: Icon,
    badgeClass,
    iconClass,
    label,
    tooltip,
    duration,
    pulse,
  } = statusMap[status];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          onClick={onClick}
          animate={{ opacity: pulse ? [1, 0.4, 1] : 1 }}
          transition={{ duration, repeat: Infinity }}
          className="flex items-center cursor-pointer gap-2"
        >
          <Badge className={`${badgeClass} w-20`}>
            <Icon className={`w-4 h-4 ${iconClass}`} />
            {label}
          </Badge>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
