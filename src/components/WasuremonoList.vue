<template>
  <main>

    <div class="container">
      <div class="subcontainer">

 <!-- タイトル -->
 <div class="title">
  <h1>幼稚園登園前<br>忘れ物管理アプリ</h1>
  <p>毎朝必ず用意するものを事前に記入して、
    <br>朝出る前にチェックして忘れ物をなくそう🎵
  </p>
 </div>
 
 <!-- リストの入力 -->
 <section class="input-field">
  <div>
    <input class="text-holder" type="text" placeholder="リストを入力">
  </div>
 

 <!-- 子供の名前選択 -->
 <div class="selected-children">
  <label for="children">子供の名前：
 <select id="children" v-model="selectedChild">
  <option v-for="child in children" :key="child.id" :value="child">
  {{ child.name }}
     </option>
   </select>
  </label>
 </div>

 <!-- 日付を選択 -->
 <div class="selected-calendar">
  <label for="date">日付を選択：
    <input id="calendar" type="date" v-model="selectedDate">
  </label>
 </div>

 <!-- ボタン -->
<button class="add-button">追加</button> 
<button class="reset-button">リセットする</button>
</section>

 <!-- リストを表示するエリア -->
 <section class="listing-area">
  <ul>
    <h3>の忘れ物リスト</h3>
    <li>
      <input>
      <button class="fix-button" >修正</button>
      <button class="delete-button">削除</button>
    </li>
  </ul>
</section>


  </div>
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

<style scoped>
.title {
  text-align: center;
}

.input-field {
  justify-content: center;
  text-align: center;
}

.add-button {
 width: 70%;
 height: 46px;
 border: none;
 margin-top: 8px;
 font-weight: bold;
 cursor: pointer;
 background-color: cadetblue;
 color: white;
 border-radius: 16px;
 transition: all 0.5s ease;
}

.reset-button {
 width: 70%;
 height: 46px;
 border: black 3px solid;
 margin-top: 8px;
 font-weight: bold;
 cursor: pointer;
 color: black;
 border-radius: 16px;
 transition: all 0.5s ease;
}


.text-holder {
  height: 40px;
  border-width: 4px;
  padding: 4px;
  font-size: 16px;
  width: 70%;
}
.selected-children {
  margin: 8px 8px;
}

.selected-children select {
  width: 40%;
  padding: 8px;
}

.selected-calendar {
  margin: 8px 8px;
}

.selected-calendar input {
  width: 35%;
  padding: 8px;
}


.fix-buttton {
  margin-right: 8px;
}
</style>