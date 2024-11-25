const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/registrar/categoria",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegisterCategorie.vue") },
    ],
  },

  {
    path: "/registrar/modelo",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegisterModel.vue") },
    ],
  },

  {
    path: "/registrar/equipamento",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegisterEquipment.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
