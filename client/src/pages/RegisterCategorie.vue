<template>
  <div class="container">
    <q-p>
      <h3 class="title">Cadastrar categoria</h3>
    </q-p>

    <form @submit.prevent="onSubmit">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 600px">
          <q-input
            filled
            v-model="categorie"
            name="categorie"
            label="Informe a categoria"
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
import { ref } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";

const toast = useToast();

defineOptions({
  name: "RegisterCategorie",
});

const categorie = ref("");

async function onSubmit() {
  try {
    const response = await api.post("/register/categorie", {
      categorie: categorie.value,
    });

    console.log("Dados enviados com sucesso:", response.data);
    toast.success("Categoria cadastrado com sucesso!");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.status === 400) {
      toast.error("É preciso informar uma categoria.");
    }
    else if (err.response && err.response.status === 409) {
      console.error("Erro ao enviar dados:", err);
      toast.error(`A categoria já se encontra registrada.${'\n'}Cadastre uma categoria diferente.`);
    }
    else {
      toast.error("Ocorreu um erro ao cadastrar a categoria.");
    };
  };
};

function resetForm() {
  categorie.value = "";
}
</script>
