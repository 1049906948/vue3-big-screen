<template>
  <main class="p-4 bg-gray-50 min-h-screen">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl my-6">评论</h2>

      <CommentBox @submit="addNewComment" />
      <!-- 分隔线 -->
      <DividerHorizontal />
      <div v-for="comment in comments" :key="comment.id">
        <!-- 留言 -->
        <CommentItem
            :user="comment.user"
            :avatar="comment.avatar"
            :time="comment.time"
            :content="comment.content"
        />
        <!-- 留言列表 -->
        <ReplyContainer v-if="comment.replies">
          <CommentItem
              v-for="reply in comment.replies"
              :key="reply.id"
              :user="reply.user"
              :avatar="reply.avatar"
              :time="reply.time"
              :content="reply.content"
          />
        </ReplyContainer>
        <ReplyBox @submit="addNewComment($event, comment.id)" />
      </div>

    </div>
  </main>
</template>

<script setup>
import CommentBox from "./components/CommentBox.vue";
import DividerHorizontal from "./components/DividerHorizontal.vue";
import CommentItem from "./components/CommentItem.vue";
import ReplyContainer from "./components/ReplyContainer.vue";
import ReplyBox from "./components/ReplyBox.vue";

import { ref, onMounted } from "vue";
const comments = ref([]);

function getAllComments() {
  // const res = await fetch("/api/comments");
  // comments.value = await res.json();

  comments.value = [
    {
      user:"123",
      avatar:"https://avatars.githubusercontent.com/u/2687921?v=4",
      time:"2022",
      content:"内容",
      replies:null
    },
    {
      user:"123",
      avatar:"https://avatars.githubusercontent.com/u/2687921?v=4",
      time:"2022",
      content:"内容",
      replies:[
        {
          user:"123",
          avatar:"https://avatars.githubusercontent.com/u/2687921?v=4",
          time:"2022",
          content:"内容",
        }
      ]
    }
  ]

}

onMounted(() => {
  getAllComments();
});


const addNewComment = async (content, replyTo) => {
  console.log(content, replyTo)

  // const res = await fetch(`/api/comments`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     content,
  //     ...(replyTo && { replyTo }),
  //   }),
  // });
  //
  // const newComment = await res.json();
  // if (!replyTo) {
  //   comments.value.unshift(newComment);
  // } else {
  //   comments.value.find((c) => c.id === replyTo).replies.unshift(newComment);
  // }

  // 新增完评论后，自动获取新的评论列表
  // Notion API 有延迟，在添加完 page 之后，需要过一会才能获取到新的评论列表
  // setTimeout(async () => {
  //   await getAllComments();
  // }, 1000);

};

</script>

<style scoped>

</style>
