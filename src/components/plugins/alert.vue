<script>
  const miniAlert = {};
  miniAlert.install = function (Vue, options) {
    const opt = {
      type: 'alert',
      duration: '1500'
    };
    Vue.prototype.$miniAlert = (opts) => {

      const elMsg = document.getElementsByClassName('mini-alert');
      if (elMsg.length) return false;

      const MsgTpl = Vue.extend({ 
        template: '<div class="mini-alert bounce"><div class="mini-alert__body"><i class="el-icon-' + opt.type + '"></i><p>' + opts.msg + '</p></div></div>'
      });

      const tpl = new MsgTpl().$mount('').$el;
      document.body.appendChild(tpl);

      setTimeout(() => {
        document.body.removeChild(tpl);
        if (opts.onClose && typeof opts.onClose === 'function') {
          opts.onClose();
        }
      }, opts.duration || opt.duration);
    };
  };
  export default miniAlert;
</script>

