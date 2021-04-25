<template>
  <div class="app">
    <div class="todolist">
      <h1>ToDoList</h1>
      <div class="card_header">
        <input
          type="text"
          @keyup.enter="showAlert"
          class="form-control"
          autocomplete="off"
          placeholder="请输入内容"
          v-model="val"
        />
        <div ref="alert1">
          <b-alert
            style="color: #000"
            class="animate__animated animate__bounceInDown"
            :show="dismissCountDowns"
            variant="danger"
            @dismissed="dismissCountDowns = 0"
          >
            <b-icon icon="shield-lock-fill"></b-icon>
            请输入内容
          </b-alert>
        </div>
        <b-button @click="showAlert" variant="info" size="sm" class="m-1 btn">
          添加
        </b-button>
      </div>
      <div class="card_main">
        <div class="tab">
          <router-link
            :class="{ select: tabs == item.name }"
            v-for="item in tab"
            :key="item.id"
            :to="{ name: item.name }"
          >
            {{ item.con }}
          </router-link>
        </div>
        <ul class="list">
          <!-- <router-view :boos="boos" :todoList="todoList" :list="list" :id="id"></router-view> -->
          <li ref="showLI" v-for="item in todoList" :key="item.id">
            <span
              :class="{ select: item.boo }"
              @click="
                (item.boo = !item.boo),
                  $router.push({
                    name: $route.name,
                    query: {
                      num: Math.random(),
                    },
                  })
              "
              >{{ item.con }}</span
            >
            <div ref="alert2">
              <b-alert
                style="color: #000"
                class="animate__animated animate__bounceInDown"
                :show="dismissCountDown"
                variant="danger"
                @dismissed="dismissCountDown = 0"
              >
                <b-icon icon="shield-lock-fill"></b-icon>
                密码错误
              </b-alert>
            </div>
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
          <h1 v-if="lists.length == 0">暂无内容</h1>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      dismissCountDowns: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      tab: [
        {
          id: 1,
          name: "All",
          con: "全部",
        },
        {
          id: 2,
          name: "Unfinish",
          con: "未完成",
        },
        {
          id: 3,
          name: "Finished",
          con: "完成",
        },
      ],
      list: JSON.parse(localStorage.getItem("todolist")) || [],
      todoList: JSON.parse(localStorage.getItem("todolist")) || [],
      val: "",
      tabs: "",
      boos: false,
      id: "",
      lists: [],
    };
  },
  methods: {
    // countDownChangeds(dismissCountDowns) {
    //   this.dismissCountDowns = dismissCountDowns;
    // },
    // countDownChanged(dismissCountDown) {
    //   this.dismissCountDown = dismissCountDown;
    // },
    showAlert() {
      if (this.val == "") {
        this.dismissCountDowns = this.dismissSecs;
        // this.$refs.alert2.style.display = "none";
        // this.$refs.alert1.style.display = "block";
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
      // this.$refs.alert1.style.display = "none";
      // this.$refs.alert2.style.display = "block";
      this.list = this.todoList.filter((item) => item.id != this.id);
      this.todoList = this.list.filter((item) => item.id != this.id);
    },
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.name == "Todolist") {
          this.tabs = "All";
        } else if ((this.name = val.name)) {
          this.tabs = val.name;
        }
        if (this.tab[0].name == val.name) {
          this.todoList = this.list;
        } else if (this.tab[1].name == val.name) {
          this.todoList = this.list.filter((item) => !item.boo);
        } else if (this.tab[2].name == val.name) {
          this.todoList = this.list.filter((item) => item.boo);
        }
        this.lists = this.list.filter((item) => {
          if (val.name === "All") {
            return true;
          } else if (val.name === "Unfinish") {
            return !item.boo;
          } else {
            return item.boo;
          }
        });
      },
    },

    list: {
      deep: true,
      handler(value) {
        if (this.$route.name == "Todolist") {
          this.todoList = value;
        }
        localStorage.setItem("todolist", JSON.stringify(value));
      },
    },
    todoList: {
      deep: true,
      handler(value) {
        if (this.$route.name == "Todolist") {
          this.list = value;
        }
        localStorage.setItem("todolist", JSON.stringify(value));
      },
    },
  },
};
</script>
<style lang="scss">
.app {
  .todolist {
    width: 320px;
    margin: 50px auto;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    position: relative;
    h1 {
      width: 100%;
      text-align: center;
      padding: 15px;
      font-size: 20px;
    }
    .card_header {
      padding: 18px 20px;
      border: 1px solid #ebeef5;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        flex: 1;
        margin-right: 15px;
        font-size: 14px;
        border-radius: 5px;
      }
      .alert {
        position: absolute;
        top: -50px;
        left: 0;
        width: 100%;
        height: 48px;
        z-index: 1;
      }
      button {
        background: #409eff;
      }
    }
    .card_main {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      .tab {
        width: 100%;
        display: flex;
        justify-content: center;
        a {
          width: 70px;
          height: 40px;
          color: #333;
          text-decoration: none;
          border: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          &.select {
            background: #409eff;
            border-color: #409eff;
            color: #fff;
            &:hover {
              color: #fff;
            }
          }
          &:hover {
            color: #409eff;
          }
          &:first-child {
            border-right: 0;
            border-radius: 5px 0 0 5px;
          }
          &:nth-child(2) {
            border-right: 0;
          }
          &:last-child {
            border-radius: 0 5px 5px 0;
          }
        }
      }
      .list {
        li {
          width: 100%;
          display: flex;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          justify-content: space-between;
          align-items: center;
          span {
            display: inline-block;
            flex: 1;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            &.select {
              text-decoration: line-through;
            }
          }
          button {
            width: 56px;
            height: 28px;
            background: #409eff;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .alert {
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            height: 48px;
            background: #f0f9eb;
            color: #67c23a;
          }
          .pop_up {
            width: 400px;
            background-color: #fff;
            border-radius: 5px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            border-radius: 5px;
          }
          .pop_up .tit {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
            font-size: 18px;
            font-weight: 500;
            span {
              flex: 0;
              cursor: pointer;
            }
          }

          .pop_up .info {
            height: 60px;
            font-size: 16px;
            line-height: 60px;
            margin: 0;
            padding: 0 20px;
            box-sizing: border-box;
            color: #333;
          }

          .pop_up .control {
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
          }

          .pop_up .control .close {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-right: 10px;
            font-size: 14px;
            background: #fff;
            color: #409eff;
            &:hover {
              background: #c6e2ff;
            }
          }
          .pop_up .control .save {
            padding: 5px;
            border-radius: 5px;
            background-color: #409eff;
            border: 1px solid #ccc;
            a {
              color: #fff;
              text-decoration: none;
            }
            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
  }
}
</style>
