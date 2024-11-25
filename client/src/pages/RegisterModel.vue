<template>
  <div class="container">
    <q-p>
      <h3 class="title">Cadastrar marca e modelo</h3>
    </q-p>

    <form @submit.prevent="onSubmit">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 600px">
          <q-input filled v-model="mark" label="Informe a marca" />
          <q-input filled v-model="model" label="Informe o modelo" />
          <q-select
           outlined v-model="categorieId"
           :options="categories"
           label="Categoria"
          />

          <div>
            <q-btn label="Enviar" type="submit" color="primary" />
            <q-btn
              label="Limpar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="resetForm"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-left: 2rem;
}
</style>

<script setup>
import { ref, onMounted, reactive } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";
import {object, string, number} from "yup";

const toast = useToast();

defineOptions({
  name: "RegisterModel",
});

const mark = ref("");
const model = ref("");
const categorieId = ref("");
const categories = ref([]);
const errors = reactive({mark: "", model:"", categorieId:""});

const schema = object().shape({
  mark: string().required('Você precisa informar a marca!'),
  model: string().required('Você precisa informar o modelo!'),
  categorieId: number().required('Você precisa informar a categoria!')
});

async function fetchCategories(){
  try{
    const response = await api.get('/categories');
    const arrCategories = response.data.categories;

    categories.value = arrCategories.map((category) => ({
      label: category.categorie,
      value: category.id
    }));

  } catch(err){
    console.log("Ocorreu um erro ao buscar as categorias.");
    toast.error("Ocorreu um erro ao buscar as categorias");
  };
};


async function onSubmit() {
  try {
    await schema.validate(
      {
        mark: mark.value,
        model: model.value,
        categorieId: categorieId.value.value
      },
      { abortEarly: false }
    );

    const response = await api.post("/register/model", {
      mark: mark.value,
      model: model.value,
      categorieId: categorieId.value.value
    });

    console.log("Dados enviados com sucesso:", response.data);
    toast.success("Modelo cadastrado com sucesso!");
    resetForm();
  } catch (err) {
    if (err.name === "ValidationError") {
      errors.mark = "";
      errors.model = "";
      errors.categorieId = "";

      err.inner.forEach((e) => {
        errors[e.path] = e.message;
        toast.error(e.message);
      });
    } else {
      console.error("Erro ao cadastrar:", err);
      toast.error("Erro ao cadastrar marca e modelo.", "negative");
    }
  };
};

function resetForm() {
  mark.value = "";
  model.value = "";
  categorieId.value = "";
};

onMounted(() => {
  fetchCategories();
});

</script>
