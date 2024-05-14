<template>
  <main>
 <!-- タイトル -->
 <div>
  <h1>幼稚園登園前忘れ物管理アプリ</h1>
 </div>

 <!-- 子供の名前選択 -->
 <div>
  <label for="children">子供の名前：
 <select id="children" v-model="selectedChild">
  <option v-for="child in children" :key="child.id" :value="child">
  {{ child.name }}
     </option>
   </select>
  </label>
 </div>

 <!-- 日付を選択 -->
 <div>
  <label for="date">日付を選択：
    <input id="calendar" type="date" v-model="selectedDate">
  </label>
 </div>

  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTaskStore } from '@/stores/task.js';

const taskStore = useTaskStore();

// 子供の名前
const children = reactive([
  { id: 1, name:'エイト'},
  { id: 2, name:'トウリ'},
]);

// リアクティブなデータ
const selectedChild = ref(null);
const selectedDate = ref(null);
const newItem = ref('');


</script>

<style lang="scss" scoped>

</style>