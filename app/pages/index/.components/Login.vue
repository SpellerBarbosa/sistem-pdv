<script setup lang="ts">
import ButtonComponent from "../../../components/form/ButtonComponent.vue";
import InputComponent from "../../../components/form/InputComponent.vue";
import iconLogin from "~/assets/img/user.png";
import iconPassword from "~/assets/img/password.png";
import { message } from "@tauri-apps/plugin-dialog";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Window } from "@tauri-apps/api/window";
import { ref } from "vue";
import { api } from "../../../utils/URL";

const username = ref<string>("");
const password = ref<string>("");

async function handleSubmit() {
  if (!username.value || !password.value) {
    await message("Preencha todos os campos corretamente", {
      title: "error",
      kind: "error",
    });
    console.log("alo");
  }

  try {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value.trim().toLowerCase(),
        password: password.value.trim(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const dashboardWindow = new WebviewWindow("dashboard", {
        url: "/dashboard",
        title:"Sistema",
        width: 1280,
        height: 720,
        center: true,
        maximized: true,
        resizable: false,
      });

      dashboardWindow.once("tauri://created", () => {
        console.log("Dashboard aberta com sucesso");
      });

      dashboardWindow.once("tauri://error", (e) => {
        console.error("Error ao abrir Dashboard: ", e);
      });

      const win = new Window('launcher')
      win.close()
      
    }else{
        await message(`${data.message}`, { title: "error", kind: "error" })
    }
  } catch (error) {}
}
</script>
<template>
  <section class="w-screen h-[65vh]">
    <form
      class="w-full h-full flex flex-col justify-evenly items-center bg-green-100"
    >
      <InputComponent
        link="user"
        input_name=""
        input_type="text"
        v-model="username"
        place="Digite seu usuario"
        :icon="iconLogin"
      />
      <InputComponent
        link="password"
        input_name=""
        input_type="password"
        v-model="password"
        place="******"
        :icon="iconPassword"
      />

      <ButtonComponent
        btn_name="entrar"
        btn_type="button"
        @click="handleSubmit"
      />
    </form>
  </section>
</template>
