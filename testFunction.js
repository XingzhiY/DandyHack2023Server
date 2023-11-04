class StringList {
    constructor() {
      this.list = [];
    }
  
    // 添加字符串到列表
    addString(string) {
      this.list.push(string);
    }
  
    // 删除指定字符串
    removeString(string) {
      const index = this.list.indexOf(string);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    }
  
    // 获取列表中的所有字符串
    getAllStrings() {
      return this.list;
    }
  
    // 清空列表
    clearList() {
      this.list = [];
    }
  }
  
  // 创建一个Map，其中键是group ID，值是StringList实例
  const groupMap = new Map();
  
  // 为不同的group ID 创建 StringList 实例并添加字符串
  const group1List = new StringList();
  group1List.addString("Apple");
  group1List.addString("Banana");
  group1List.addString("Cherry");
  groupMap.set(1, group1List);
  
  const group2List = new StringList();
  group2List.addString("Orange");
  group2List.addString("Grape");
  groupMap.set(2, group2List);
  
  // 获取特定group的字符串列表
  console.log(groupMap.get(1).getAllStrings()); // ["Apple", "Banana", "Cherry"]
  console.log(groupMap.get(2).getAllStrings()); // ["Orange", "Grape"]
  
  // 删除特定group的字符串
  groupMap.get(1).removeString("Banana");
  console.log(groupMap.get(1).getAllStrings()); // ["Apple", "Cherry"]
  
  // 清空特定group的字符串列表
  groupMap.get(1).clearList();
  console.log(groupMap.get(1).getAllStrings()); // []
  
  // 清空整个Map
  groupMap.clear();
  console.log(groupMap.size); // 0
  