import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  Package,
  PieChart,
  Sliders,
  Users,
} from "lucide-react";

const clientsSection = [
    {
    href: "/",
    icon: Briefcase,
    title: "Clients",
    children: [
      {
        href: "peacocks/overview",
        title: "Peacocks",
      },
            {
        href: "prezzo/overview",
        title: "Prezzo",
      },
            {
        href: "radley/overview",
        title: "Radley",
      },

    ],
  },]


const clientItems = 
  {
    title: "Clients",
    pages: clientsSection,
  }


export default clientItems;
