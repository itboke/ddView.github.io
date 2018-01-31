<template>
  <div class="mini-distpicker" v-show="visible">
    <div class="distpicker-mask"></div>
    <div class="distpicker-picker distpicker-animate-slide-up">
      <div class="distpicker-picker__hd">
        <a href="javascript:;" class="distpicker-picker__action" @click.stop="cancelSelected">取消</a>
        <a href="javascript:;" class="distpicker-picker__action" @click.stop="confirmSelected">确定</a>
      </div>
      <div class="distpicker-picker__bd">
        <!-- 省份 -->
        <div class="distpicker-picker__bd"
          @touchstart="touchStart($event, 'provinceTop', 'provinceList')"
          @touchmove="touchMove($event)"
          @touchend="touchEnd($event)"
        >
          <div class="distpicker-picker__group">
            <div class="distpicker-picker__mask"></div>
            <div class="distpicker-picker__indicator"></div>
            <div class="distpicker-picker__content" id="provinceTop" :style="{ transform: 'translate3d(0px,' + provinceTop + 'px,0px)', transition: 'all .5s' }">
              <div class="distpicker-picker__item" v-for="item in provinceList">{{item.value}}</div>
            </div>
          </div>
        </div>
        <!-- 市区 -->
        <div class="distpicker-picker__bd"
          @touchstart="touchStart($event, 'cityTop', 'cityList')"
          @touchmove="touchMove($event)"
          @touchend="touchEnd($event)"
        >
          <div class="distpicker-picker__group">
            <div class="distpicker-picker__mask"></div>
            <div class="distpicker-picker__indicator"></div>
            <div class="distpicker-picker__content" id="cityTop" :style="{ transform: 'translate3d(0px,' + cityTop + 'px,0px)', transition: 'all .5s' }">
              <div class="distpicker-picker__item" v-for="item in cityList">{{item.value}}</div>
            </div>
          </div>
        </div>
        <!-- 县区 -->
        <div class="distpicker-picker__bd"
          @touchstart="touchStart($event, 'areaTop', 'areaList')"
          @touchmove="touchMove($event)"
          @touchend="touchEnd($event)"
        >
          <div class="distpicker-picker__group">
            <div class="distpicker-picker__mask"></div>
            <div class="distpicker-picker__indicator"></div>
            <div class="distpicker-picker__content" id="areaTop" :style="{ transform: 'translate3d(0px,' + areaTop + 'px,0px)', transition: 'all .5s' }">
              <div class="distpicker-picker__item" v-for="item in areaList">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import distpickerDataList from './data.js';
  export default {
    props: {
      cancel: Function,
      confirm: Function,
      toast: Function,
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        numRange: 35,
        defaultTop: 102,
        provinceTop: 102,
        cityTop: 102,
        areaTop: 102,
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        index: 0,
        contentHeight: 0,
        provinceList: [],
        cityList: [],
        areaList: [],
        province: '',
        city: '',
        area: '',
        areaCode: '',
        curType: '',
        dataType: '',
        visible: this.isSelected,
        noArea: false
      };
    },
    watch: {
      isSelected(isSelected) {
        this.visible = isSelected;
        if (isSelected) {
          const provincelist = distpickerDataList['100000'];
          const citylist = distpickerDataList['110000'];
          const arealist = distpickerDataList['110100'];
          this.initDataList(provincelist, 'provinceList');
          this.initDataList(citylist, 'cityList');
          this.initDataList(arealist, 'areaList');
          this.visible = true;
          this.curType = 'provinceTop';
          this.province = this.provinceList[0].value;
          this.city = this.cityList[0].value;
          if (this.areaList.length) {
            this.area = this.areaList[0].value;
            this.areaCode = this.areaList[0].code;
          }
        }
      }
    },
    updated() {
      const id = '#' + this.curType;
      this.contentHeight = document.querySelector(id).offsetHeight - this.defaultTop - this.numRange;
    },
    methods: {
      initDataList(list, name) {
        let arr = [];
        Object.keys(list).forEach((key) => {
          const temp = {};
          temp.code = key;
          temp.value = list[key];
          arr.push(temp);
        });
        this[name] = arr;
      },
      cancelSelected() {
        this.provinceTop = this.defaultTop;
        this.cityTop = this.defaultTop;
        this.areaTop = this.defaultTop;
        this.cancel && this.cancel();
      },
      confirmSelected() {
        const data = {
          province: this.province,
          city: this.city,
          area: this.area,
          code: this.areaCode
        };
        this.confirm && this.confirm(data);
        this.provinceTop = this.defaultTop;
        this.cityTop = this.defaultTop;
        this.areaTop = this.defaultTop;
      },
      endSelected() {
        const value = this[this.dataType][this.index].value;
        const code = this[this.dataType][this.index].code;

        if (this.curType === 'provinceTop') {
          this.initDataList(distpickerDataList[code], 'cityList');
          this.initDataList(distpickerDataList[this.cityList[0].code], 'areaList');
          this.province = value;
          this.city = this.cityList[0].value;
          if (this.areaList.length) {
            this.area = this.areaList[0].value;
            this.areaCode = this.areaList[0].code;
          }
          this.cityTop = this.defaultTop;
          this.areaTop = this.defaultTop;
        }
        if (this.curType === 'cityTop') {
          this.initDataList(distpickerDataList[code], 'areaList');
          this.city = value;
          this.areaTop = this.defaultTop;
          if (!this.areaList.length) {
            this.noArea = true;
            this.areaCode = code;
          } else {
            this.noArea = false;
            this.area = this.areaList[0].value;
            this.areaCode = this.areaList[0].code;
          }
        }
        if (this.curType === 'areaTop') {
          this.area = value;
          this.areaCode = code;
        }
      },
      touchPosition(e) {
        const touches = e.changedTouches;
        this.y = touches[0].clientY;
        this.x = touches[0].clientX;
      },
      touchStart(e, type, dataType) {
        this.touchPosition(e);
        this.startY = this.y;
        this.startX = this.x;
        this.curType = type;
        this.dataType = dataType;
      },
      touchMove(e) {
        e.preventDefault();
        this.touchPosition(e);
        const moveY = this.y - this.startY;
        const moveX = this.x - this.startX;
        this.startY = this.y;
        this.startX = this.x;
        if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
          const scrollTop = this[this.curType] - Math.abs(moveY);
          this[this.curType] = scrollTop;
        }
        if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
          this[this.curType] = moveY + this[this.curType];
        }
      },
      touchEnd(e) {
        if (this[this.curType] > this.defaultTop) {
          this[this.curType] = this.defaultTop;
          this.index = 0;
        } else if (this[this.curType] > 0) {
          if (this[this.dataType].length === 1) {
            this[this.curType] = this.defaultTop;
          } else {
            this.index = Math.round((this.defaultTop - this[this.curType]) / this.numRange);
            const dist = this.defaultTop - this.index * this.numRange;
            this[this.curType] = dist;
          }
        }
        if (this[this.curType] < 0) {
          if (this[this.curType] < this.contentHeight * -1) {
            this[this.curType] = this.contentHeight * -1;
            this.index = (this.contentHeight + this.defaultTop + this.numRange) / this.numRange - 1;
          } else {
            this.index = Math.round((this.defaultTop - this[this.curType]) / this.numRange);
            const dist = this.index * this.numRange - this.defaultTop;
            this[this.curType] = dist * -1;
          }
        }
        // ----
        this.endSelected();
      }
    }
  };
</script>
