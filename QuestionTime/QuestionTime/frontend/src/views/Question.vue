<template>
    <div class="single-question mt-2">
        <div v-if="question" class="container">
            <h1>{{ question.content }}</h1>
            <p class="mb-0">
                Posted by:
                <span class="author-name">{{question.author}}</span>
            </p>
            <p>{{question.created_at}}</p>
            <QuestionActions v-if="isQuestionAuthor" :slug="slug"></QuestionActions>
            <hr />
            <div v-if="userHasAnswerd">
                <p class="answerd-added container">You've written an answer</p>
            </div>
            <div v-else-if="showForm">
                <form class="card" @submit.prevent="onSubmitAnswer">
                    <div class="card-header px-3">Answer the Question</div>
                    <div class="card-block">
                        <textarea
                            rows="5"
                            class="form-control"
                            placeholder="Share your knowledge!"
                            v-model="newAnswerBody"
                        ></textarea>
                        <div v-if="error" class="alert alert-danger mt-2" role="alert">{{ error }}</div>
                    </div>
                    <div class="card-footer px-3">
                        <button type="submit" class="btn btn-sm btn-info">Submit your answer</button>
                    </div>
                </form>
            </div>
            <div v-else>
                <button class="btn btn-sm btn-info" @click="showForm = true">Answer Question</button>
            </div>
            <hr />
        </div>
        <div id="notfound" v-else>
            <h1 class="error text-center">404 - Question Not Found</h1>
        </div>
        <div class="container">
            <answer-component
                v-for="answer in answers"
                :key="answer.id"
                :requestUser="requestUser"
                :answer="answer"
                @delete="deleteAnswer"
            ></answer-component>
        </div>
        <div class="d-flex justify-content-center">
            <div v-show="loadingAnswers" class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-2">
            <button
                v-show="!loadingAnswers && next"
                class="btn btn-outline-info"
                @click="getQuestionAnswers"
            >Load more...</button>
        </div>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
import QuestionActions from "@/components/QuestionActions.vue";


export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent,
        QuestionActions
    },
    data() {
        return {
            question: {},
            answers: [],
            newAnswerBody: null,
            error: null,
            userHasAnswerd: false,
            showForm: false,
            next: null,
            loadingAnswers: false,
            requestUser: null
        };
    },
    computed: {
        isQuestionAuthor() {
            return this.question.author === this.requestUser;
        }
    },
    methods: {
        setPageTitle(title) {
            document.title = title;
        },
        setRequestUser() {
            this.requestUser = window.localStorage.getItem("username");
        },
        getQustionData() {
            let endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                if (data) {
                    this.question = data;
                    this.userHasAnswerd = data.user_has_answered;
                    this.setPageTitle(data.content);
                }else {
                    this.question = null;
                    this.setPageTitle("404 - Page not found");

                }
            });
        },
        getQuestionAnswers() {
            let endpoint = `/api/questions/${this.slug}/answers/`;
            if (this.next) {
                endpoint = this.next;
            }
            this.loadingAnswers = true;
            apiService(endpoint).then(data => {
                this.answers.push(...data.results);
                this.next = data.next;
                this.loadingAnswers = false;
            });
        },

        onSubmitAnswer() {
            let endpoint = `/api/questions/${this.slug}/answer/`;
            let method = "POST";
            if (!this.newAnswerBody) {
                return (this.error = "Please provide an answer!");
            }
            apiService(endpoint, method, { body: this.newAnswerBody }).then(
                data => {
                    this.newAnswerBody = null;
                    this.showForm = false;
                    this.userHasAnswerd = true;
                    this.answers.unshift(data);
                    this.error = null;
                }
            );
        },
        async deleteAnswer(answer) {
            let endpoint = `/api/answers/${answer.id}/`;
            try {
                await apiService(endpoint, "DELETE");
                this.$delete(this.answers, this.answers.indexOf(answer));
                this.userHasAnswerd = false;
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getQustionData();
        this.getQuestionAnswers();
        this.setRequestUser();
    }
};
</script>

<style  scoped>
.author-name {
    font-weight: bold;
    color: #dc3545;
}

.answerd-added {
    font-weight: bold;
    color: green;
}
</style>