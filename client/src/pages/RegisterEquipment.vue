<template>
  <div class="container">
    <q-page>
      <h3 class="title">Cadastrar Equipamento</h3>
      <div class="scanner-container">
        <q-uploader
          label="Enviar imagem do código"
          accept="image/*"
          :max-files="1"
          @added="processImage"
          color="primary"
          border
          style="max-width: 400px; margin: 0 auto;"
        >
          <template v-slot:header>
            <div class="q-mb-sm">Tire uma foto ou envie uma imagem</div>
          </template>
        </q-uploader>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 600px">
            <q-input
              filled
              v-model="mac"
              name="mac"
              label="Número Serial"
            />
            <q-input
              filled
              v-model="withdrawal_status"
              name="withdrawal_status"
              label="Informe o status de retirada"
            />
            <q-select
              outlined v-model="modelId"
              :options="models"
              label="Modelo"
            />

            <div>
              <q-btn label="Cadastrar" type="submit" color="primary" />
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
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";
import { BrowserMultiFormatReader } from "@zxing/library";

const toast = useToast();

defineOptions({
  name: "RegisterEquipment",
});

const mac = ref("");
const withdrawal_status = ref("");
const modelId = ref("");
const models = ref([]);

async function fetchModels() {
  try {
    const response = await api.get("/models");
    const arrModels = response.data.models;
    models.value = arrModels.map((modelo) => ({
      label: modelo.model,
      value: modelo.id,
    }));
  } catch (err) {
    console.log("Ocorreu um erro ao buscar os modelos.");
    toast.error("Ocorreu um erro ao buscar os modelos");
  }
}

async function processImage(files) {
  const file = files[0];

  if (!file) {
    toast.error("Nenhuma imagem enviada.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async (event) => {
    const imageSrc = event.target.result;

    try {
      const codeReader = new BrowserMultiFormatReader();
      const result = await codeReader.decodeFromImage(undefined, imageSrc);

      if (result) {
        mac.value = result.getText(); // Captura o valor do código de barras
        toast.success("MAC lido com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao processar a imagem:", err);
      toast.error("Erro ao ler o código na imagem. Verifique a qualidade.");
    }
  };

  reader.readAsDataURL(file); // Converte a imagem para um formato lido pelo navegador
}

async function onSubmit() {
  try {
    const response = await api.post("/register/equipment", {
      mac: mac.value,
      withdrawal_status: withdrawal_status.value,
      modelId: modelId.value,
    });

    console.log("Dados enviados com sucesso:", response.data);
    toast.success("Categoria cadastrada com sucesso!");
  } catch (err) {
    console.log(err.response);
    toast.error("Erro ao cadastrar o equipamento.");
  }
}

function resetForm() {
  mac.value = "";
  withdrawal_status.value = "";
  modelId.value = "";
}

fetchModels();
</script>

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

.scanner-container {
  position: relative;
  width: 100%;
  max-width: 350px;
  height: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
</style>
