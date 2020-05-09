<template>
    <div id="app">
        <navbar-component></navbar-component>
        <router-view />
    </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";
import { apiService } from "@/common/api.service.js";
export default {
    name: "App",
    components: {
        NavbarComponent
    },
    methods: {
        async setUserInfo(){
            const data = await apiService("/api/user/");
            const requestUser = data["username"];
            window.localStorage.setItem("username",requestUser);
            console.log(data);
            console.log(requestUser);
        }
    },
    created(){
        this.setUserInfo();
    }
};
</script>

<style>
    html,
    body {
        height: 100%;
        font-size: 0.95rem;
        font-family: "Playfair Display", serif;
    }
    .btn:focus{
        box-shadow: none !important;
    }
</style>
