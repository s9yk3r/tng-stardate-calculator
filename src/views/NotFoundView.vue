<script setup lang="ts">

</script>

<template>
    <div class="not-found">
        <h1 class="error-code">404</h1>
        <p class="message">
            ⚠️ Navigation error detected.<br>
            This sector of space appears uncharted.
        </p>
        <router-link to="/"
                     class="btn btn-outline-info mt-3">
            🔙 Return to base
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.not-found {
  font-family: 'Orbitron', sans-serif;
  color: #00ffff;
  background: radial-gradient(circle at top, #0a0a23, #000000);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .error-code {
    font-size: 8rem;
    font-weight: bold;
    text-shadow: 0 0 20px #00ffff;
    margin-bottom: 1rem;
  }

  .message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  a.btn {
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    text-decoration: none;
  }
}
</style>
