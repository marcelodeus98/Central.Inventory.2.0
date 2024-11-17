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

defineOptions({
  name: "RegisterModel",
});

const mark = ref("");
const model = ref("");

async function onSubmit() {
  try {
    const response = await api.post("/register/model", {
      mark: mark.value,
      model: model.value,
    });
  } catch (err) {
    console.error("Erro ao enviar dados:", err);
    alert("Erro ao cadastrar marca e modelo.");
  }
}

function resetForm() {
  mark.value = "";
  model.value = "";
}
</script>
