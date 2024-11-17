import { boot } from "quasar/wrappers";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default boot(({ app }) => {
  const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    hideProgressBar: false,
    icon: true,
  };

  app.use(Toast, options);
});
