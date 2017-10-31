<template>
  <div>
    <miniPagescrolling>
      <!-- 按钮组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">按钮组件</h5><br/>
        <miniButton :type="type">确定</miniButton>
      </div>
      <!-- alert组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">按钮组件</h5><br/>
        <miniButton :type="type" @click="alert()">alert出来</miniButton>
      </div>
      <!-- 对话框组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">对话框组件</h5><br/>
        <miniButton :type="type" @click="modal()">modal出来</miniButton>
        <miniModal
          v-if = "isModal"
          titleAlign = "center"
          :hidden = "false"
          :confirm = "modalConfirm"
          :cancel = "modalCancel"
        >
          <div class="">
            hello,world!!!!!!!!!!!!hello
          </div>
        </miniModal>
      </div>
      <!-- 上滑弹层组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">动画上滑弹层组件</h5><br/>
        <miniButton :type="type" @click="overlay()">点击滑出</miniButton>
        <miniOverlay v-model="isShow" :overlay="true">
          <div style="padding: 20px;">
            VueJS 推出了一个新的版本。对于不知道 VueJS 为何物的同学，可以去他们的官网看看。VueJS 是一个融合了 AngularJS 和 React 一些特性的前端框架。第一版的 VueJS 可以被称作 “AgularJS lite”，它有类似 Angular 的模板系统，也用到了“脏检查”技术（原文这里有误，在Vue中，实际上用的是 es5 的 Object.defineProperty）去监测那些需要在 DOM 中变化的数据。然而，VueJS 的API 很小巧，因为它不会包含一些额外的工具库如 AJAX，这点和 React 很像。 然而，在下一个版本中，一些事情改变了。它像 React 一样使用了 “Virtual DOM” 模型，同时允许开发者选择任意类型的模板。因此，VueJS 的作者也实现了流式服务端渲染技术，这个技术在今天的 Web 开发中总是受欢迎的。幸运的是，API 接口本身没有多少改变。VueJS 的周边的开发工具需要更新去兼容新的版本，不过我们仍然可以使用 .vue 单文件去开发组件。想要好好的看一下新版本的实现和一些 API 的改变的话，仔细阅读 VueJS 这个Github issue
          </div>
        </miniOverlay>
      </div>
      <!-- 轮播图组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">轮播图组件</h5>
        <miniCarousel :images="images" :targetLink="targetLink" :magnifier="false"></miniCarousel>
      </div>
      <!-- tab切换组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">tab切换组件</h5>
        <miniTab>
          <tabItem label="标签一">标签一的内容</tabItem>
          <tabItem label="标签二">标签二的内容</tabItem>
          <tabItem label="标签三二一">标签三二一的内容</tabItem>
        </miniTab>
      </div>
      <!-- 获取验证码组件 -->
      <div style="padding: 10px;">
        <h5 class="comp-title">获取验证码组件</h5>
        <miniSmsVerification :handleGetVerifiCode="handleGetVerifiCode"></miniSmsVerification>
      </div>
    </miniPagescrolling>
  </div>
</template>
<style>
.comp-title {
  display: inline-block;
  margin-bottom: 10px;
  padding: 5px 8px;
  border-radius: 4px;
  background-color: #f90;
  color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      type: 'primary',
      isShow: false,
      isModal: false,
      images: [
        'http://dwz.cn/6CDHuA',
        'http://dwz.cn/6CDHN5',
        'http://dwz.cn/6CE5EQ'
      ],
      targetLink: [
        {
          type: 'reflesh',
          url: 'http://www.baidu.com/'
        },
        {
          type: 'vueRouter',
          url: '/user/info'
        }
      ]
    }
  },
  methods: {
    overlay() {
      this.isShow = true;
    },
    alert() {
      this.$miniAlert({
        msg: 'hello,body,go,go,go'
      });
    },
    modal() {
      this.isModal = !this.isModal;
    },
    modalConfirm() {
      this.$miniAlert({
        msg: '您点击了确定'
      });
    },
    modalCancel() {
      this.$miniAlert({
        msg: '你点击了取消'
      });
      this.isModal = !this.isModal;
    },
    handleGetVerifiCode(cb) {
      if (true) {
        cb();
      }
    }
  }
}
</script>
