import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

//Layouts
import Dashboard from "@/layouts/Dashboard";

//Views
import DashboardIndex from "@/views/Dashboard/Index";
import PackageManager from "@/views/Dashboard/PackageManager";
import InvoiceManager from "@/views/Dashboard/InvoiceManager";
import UsersManager from "@/views/Dashboard/UsersManager";
import Reports from "@/views/Dashboard/Reports";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    component: Dashboard,
    children: [
      {
        path: "",
        name: "DashboardIndex",
        component: DashboardIndex,
      },
      {
        path: "/package-manager",
        name: "PackageManager",
        component: PackageManager,
      },
      {
        path: "/invoice-manager",
        name: "InvoiceManager",
        component: InvoiceManager,
      },
      {
        path: "/users-manager",
        name: "UsersManager",
        component: UsersManager,
      },
      {
        path: "/reports",
        name: "Reports",
        component: Reports,
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
