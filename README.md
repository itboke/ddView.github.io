### 组件开发时间和描述和版本进度

>2017-10-31 | modal组件 | 1.0完成

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
参数|默认值|类型|描述
-|-|-|-
hidden|true|Boolean|默认隐藏底部遮罩
confirm|() => {}|Function|点击确定的回调函数
cancel|() => {}|Function|点击取消的回调函数
titleAlign|left|String|标题的对齐方式

>2017-10-31 | loading组件 | 1.0完成

```
<miniLoading v-show="isLoading" type="herload" tips="loading..."></miniLoading>

```
参数|默认值|类型|描述
-|-|-|-
type|meload|String|根据类型的值显示不同loading的图标, (meload|yourload|herload)
tips|加载中...|String|loading过程中的文字提示

>2017-11-01 | 倒计时组件 | 1.0未完成

```
<miniCountdown
  :startTime="'2017-11-01 10:00:00'"
  :endTime="'2017-11-03 11:00:00'"
  :readyCallBack="readyCallBackFunction"
  :endCallBack="endCallBackFunction"
></miniCountdown>

```
参数|默认值|类型|描述
-|-|-|-
startTime|必填|String|倒计时开始时间，格式(2017-11-01 12:00:00 或者 时间戳)
endTime|必填|String|倒计时结束时间, 格式(2017-11-01 12:00:00 或者 时间戳)
readyCallBack|非必填|Function|倒计时没有开始的回调函数
endCallBack|非必填|Function|倒计时已经结束的回调函数
