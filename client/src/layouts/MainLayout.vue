<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Central.Inventory
        </q-toolbar-title>

        <div>App v1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Menu principal
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Cadastro de Modelo/Marca',
    caption: 'Cadastrar novo modelo/marca',
    icon: 'fitbit',
    link: '#'
  },
  {
    title: 'Cadastro de Categoria de Equipamento',
    caption: 'Cadastrar nova categoria de equipamento',
    icon: 'category',
    link: '#'
  },
  {
    title: 'Cadastro de Equipamento',
    caption: 'Cadastrar novo equipamento',
    icon: 'router',
    link: '#'
  },
  {
    title: 'Inventário',
    caption: 'Visualizar modelos/marcas e equipamentos',
    icon: 'inventory',
    link: '#'
  },
  {
    title: 'Relatórios',
    caption: 'Consultar relatórios',
    icon: 'summarize',
    link: '#'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
