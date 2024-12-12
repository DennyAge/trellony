<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  /* neutral */
  --neutral-10-color             : #FFFFFF;
  --neutral-60-color             : #9E9E9E;
  --neutral-100-color            : #282828;
  /* shadows */
  --large-shadow  : 0 0.0625rem 1.5rem 0.5rem rgba(0, 0, 0, 0.08), 0 0 0.0625rem rgba(20, 20, 20, 0.08);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100vh;
  background: url("./public/images/bg-img.jpg") center no-repeat;
}

</style>
