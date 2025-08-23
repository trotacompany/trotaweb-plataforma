import { Head } from "$fresh/runtime.ts";
import { ButtonFilled } from "../components/ButtonFilled.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - No encontrado | TrotaWeb</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main class="px-4 py-8" style="width:100%;">
        <div class="flex flex-col justify-center align-center items-center" style="width:100%; height:100%;">
            <img
              class="my-6"
              src="/logo.png"
              width="160"
              height="160"
              alt="TrotaWeb logo: un bioma de mesa con formación de rocas naranjasy un cielo azul"
            />
            <h1 class="display-small">404 - Sitio web no encontrado</h1>
            <p class="my-4 body-large">
              La página que estás buscando no existe o ha sido movida.
            </p>
            <a href="/" class="underline">
              <ButtonFilled icon="arrow_back">Volver a inicio</ButtonFilled>
            </a>
        </div>
      </main>
    </>
  );
}
