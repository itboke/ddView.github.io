### 组件开发时间和描述和版本进度

>1: 2017-10-31 | modal组件 | 1.0完成
######参数描述
参数|默认值|类型|描述
-|-|-|-
hidden|true|Boolean|默认隐藏底部遮罩
confirm|() => {}|Function|点击确定的回调函数
cancel|() => {}|Function|点击取消的回调函数
titleAlign|left|String|标题的对齐方式
```
<miniModal
  v-if = "isModal"
  titleAlign = "center"
  :hidden = "false"
  :confirm = "modalConfirm"
  :cancel = "modalCancel"
>
  <div class="自定义内容">
    hello,world!
  </div>
</miniModal>

```
