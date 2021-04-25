<template>
  <div>
    <li ref="showLI" v-for="item in todoList" :key="item.id">
      <span :class="{ select: item.boo }" @click="item.boo = !item.boo">{{
        item.con
      }}</span>
      <!-- <b-alert
        class="alert"
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        删除成功！
      </b-alert> -->
      <div class="pop_up" v-show="boos">
        <div class="tit">
          <p>提示</p>
          <span @click="boos = false">X</span>
        </div>
        <p class="info">此操作将永久删除该记录, 是否继续?</p>
        <div class="control">
          <button class="close" @click="boos = false">取消</button>
          <button class="save">
            <a href="javascript:" @click="remove(item.id)">确定</a>
          </button>
        </div>
      </div>
      <b-button @click="del(item.id)" variant="info" class="m-1 btn">
        删除
      </b-button>
    </li>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  //   props: ["boos"],
  props: ["todoList", "boos", "id"],
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      if (this.val == "") {
        this.dismissCountDown = this.dismissSecs;
      } else {
        this.list.push({
          id: new Date().getTime(),
          con: this.val,
          boo: false,
        });
        this.val = "";
        this.todoList = this.list;
        localStorage.setItem("todolist", JSON.stringify(this.list));
      }
    },
    del(id) {
      this.id = id;
      this.boos = true;
    },
    remove(id) {
      this.boos = false;
      this.dismissCountDown = this.dismissSecs;
      this.list = this.todoList.filter((item) => item.id != this.id);
      this.todoList = this.list.filter((item) => item.id != this.id);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
