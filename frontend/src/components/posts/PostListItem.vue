<template>
    <v-row>
        <v-col
            md="2"
            sm="4"
            cols="12"
            align="center"
        >
            <v-img
                class="white--text align-end"
                height="auto"
                max-width="200px"
                :src="post.image || require('@/assets/images/no-image.png')"
            />
        </v-col>
        <v-col
            sm="6"
            cols="12"
        >
            <v-row
                class="text-center text-sm-left"
            >
                <v-col cols="12">
                    <span class="post-title">
                        {{ post.title }}
                    </span>
                </v-col>
                <v-col cols="12">
                    <span class="post-description">
                        {{ post.description }}
                    </span>
                </v-col>
                <v-col v-if="post.categories" class="categories" cols="12">
                    <v-chip
                        v-for="category in post.categories"
                        :key="category"
                        color="primary"
                    >
                        {{ category }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>
        <v-col
            sm="2"
            cols="12"
            align="center"
            align-sm="start"
        >
            <v-btn
                text
                @click="edit()"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                text
                @click="remove()"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-divider />
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PostListItem',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        async remove() {
            try {
                await this.deletePost({ id: this.post.id })
                this.$store.commit('notifier/showMessage', {
                    content: 'Post deleted successfully',
                    type: 'success'
                })
                this.$emit('delete')
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: 'An error occurred: ' + err.message,
                    type: 'error'
                })
            }
        },
        async edit() {
            this.$router.push({ name: 'EditPost', params: { id: this.post.id }})
        },
        ...mapActions('posts', {
            deletePost: 'delete'
        })
    }
}
</script>

<style scoped>
.categories span + span {
    margin-left: 1rem;
}
</style>