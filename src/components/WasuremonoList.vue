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
    <input class="text-holder" v-model="newItem" type="text" placeholder="リストを入力" @keyup.enter />

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
  <label for="calendar">日付を選択：
    <input id="calendar" type="date" v-model="selectedDate" :min="today">
  </label>
 </div>

 <!-- ボタン -->
<button class="add-button" @click="addItem">追加</button> 
<button class="reset-button" @click="resetItem">リセットする</button>
</section>

 <!-- リストを表示するエリア -->
 <section class="listing-area">
  <ul v-for="child in children" :key="child.id">
    <h3>{{ child.name }}の忘れ物リスト</h3>
    <li v-for="(item,index) in taskStore.getItemsForChild(child.id)" :key="index" :class="{ 'checked-item' : item.checked }">
      <input type="checkbox" v-model="item.checked" />
      {{ item.text }} [{{ item.date }}]
      <button class="fix-button" @click="editItem(child.id,index)">修正</button>
      <button class="delete-button" @click="removeItem(child.id, index)">削除</button>
    </li>
  </ul>
</section>

  </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useTaskStore } from '@/stores/task.js';

const taskStore = useTaskStore();

// 子供の名前
const children = reactive([
  { id: 1, name:'エイト'},
  { id: 2, name:'ト-リ'},
]);

// リアクティブなデータ
const selectedChild = ref(null);
const selectedDate = ref(null);
const newItem = ref('');

const today = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});

// アイテムを追加
const addItem = () => {
  if (newItem.value.trim() !==  '') {
    taskStore.addItem({
      text: newItem.value.trim(),
      checked: false,
      childId: selectedChild.value.id,
      date: selectedDate.value
    });
    newItem.value = '';
    updateLocalStorage();
  }
}

// リストの修正
function editItem (childId,index) {
  const newText = prompt('リストを修正してください',
  taskStore.getItemsForChild(childId)[index].text);
  if (newText !== null) {
    taskStore.editItem(childId,index,newText.trim());
  }
  updateLocalStorage();
}

// リストの削除
function removeItem(childId,index) {
  taskStore.removeItem(childId,index);
  updateLocalStorage();
}

const resetItem = () => {
  confirm('全てリセットしますか？');
  taskStore.getItems.map((item) => {
    return item.checked = false;
  });
  updateLocalStorage();
}

// ローカルストレージへデータを保存する
const updateLocalStorage = () => {
  localStorage.setItem('items', JSON.stringify(taskStore.items));
};

// ローカルストレージからデータを読み込む
const savedItems = localStorage.getItem('items');
if(savedItems) {
  taskStore.items = JSON.parse(savedItems);
}

</script>

<style scoped>
.title {
  text-align: center;
  color: rgb(209, 104, 13);
}

.reset-button {
  border: none;
  padding: 16px;
  font-weight: bold;
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
 background-color: salmon;
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

.listing-area li {
  list-style: none;
  margin-top: 8px;
}

.checked-item {
  text-decoration: line-through;
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


.fix-button {
  margin-right: 8px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 6px;
  background-color: salmon;
}

.delete-button {
  margin-right: 8px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 6px;
  background-color: rosybrown;
}
</style>