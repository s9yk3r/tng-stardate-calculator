<script setup>

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
    @use '@/assets/scss/NotFoundView';
</style>
