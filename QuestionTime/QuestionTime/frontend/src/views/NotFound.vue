<template>
    <div id="notfound" >
        <div class="container mt-3">
            <h1>{{ message }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data(){
        return {
            message: "404 - Page Not Found"
        }
    }
}
</script>

<style >
#notfound {
    color: red;
    text-align: center;
}
</style>