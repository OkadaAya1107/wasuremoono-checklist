import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
   items: [],
  }),
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  actions: {
  addItem(item) {
    this.getItems.push(item);
   },
   editItem(childId,index,newText) {
    const items = this.getItemsForChild(childId);
    items[index].text = newText;
   },
   removeItem(childId, index) {
    const confirmed = confirm('本当にリストを削除しますか？');
    if(confirmed) {
      const item = this.getItemsForChild(childId);
      const updateItem = [...this.items];
      updateItem.splice(updateItem.indexOf(item[index], 1));
      this.items = updateItem;
    }
   },
   getItemsForChild(childId) {
    if(childId === 'all') {
      return this.items;
    } else {
      return this.items.filter(item => item.childId === childId);
    }
   },
  }
});