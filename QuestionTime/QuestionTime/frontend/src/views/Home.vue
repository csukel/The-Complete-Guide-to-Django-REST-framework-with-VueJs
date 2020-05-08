<template>
    <div class="home">
        <div class="container mt-2">
            <div class="question-container mt-2" v-for="question in questions" :key="question.id">
                <p class="mb-0">
                    Posted by:
                    <span class="question-author">{{question.author}}</span>
                </p>
                <h2>
                    <router-link
                        :to="{ name:'question',params:{slug: question.slug}}"
                        class="question-link"
                    >{{question.content}}</router-link>
                </h2>
                <p>Answers: {{ question.answers_count }}</p>
            </div>
            <div class="d-flex justify-content-center">
                <div v-show="loadingQuestions" class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div  class="d-flex justify-content-center mt-2">
                <button v-show="!loadingQuestions && next" class="btn btn-outline-info" @click="getQuestions">Load more...</button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service";

export default {
    name: "Home",
    data() {
        return {
            questions: [],
            next: null,
            loadingQuestions: false
        };
    },

    methods: {
        getQuestions() {
            let endpoint = "/api/questions/";
            if (this.next) {
                endpoint = this.next;
            }
            this.loadingQuestions = true;
            apiService(endpoint).then(data => {
                this.questions.push(...data.results);
                this.next = data.next;
                console.log(this.next)
                this.loadingQuestions = false;
            });
        }
    },
    created() {
        this.getQuestions();
        console.log(this.questions);
        document.title = "QuestionTime";
    }
};
</script>

<style scoped>
.question-author {
    font-weight: bold;
    color: #dc3545;
}
.question-link {
    font-weight: bold;
    color: black;
}

.question-link:hover {
    color: #969799;
    text-decoration: none;
}

.question-container{
    border-bottom: 1px solid rgb(243, 241, 241);
}

</style>
