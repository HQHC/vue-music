<template>
  <scroll class="listview" 
  :data="data" 
  ref="listview" 
  :listenScroll="listenScroll"
  :probeType="probeType"
  @Scroll="scroll"
  >
    <ul>
      <li class="list-group"  ref="listGroup">
        <h2 class="list-group-title"> {{ title }} </h2>
        <ul>
          <li @click="selectItem(singer)" v-for="(singer,index) in data" :key="index" class="list-group-item">
            <img :src="singer.singer_pic" class="avatar"/>
            <span class="name">{{singer.singer_name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortTitleList" :data-index="index" :key="index" class="item">
          {{item}}
        </li>
      </ul>
    </div>

  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom';

const ANCHOR_HEIGHT = 18
    export default {
      created() {
        this.title = "热门"
        this.touch = {},
        this.probeType = 3;
      },
      data(){
        return {
        listenScroll : true,
        scrollY : -1,
        currentIndex : 0,
        listheight: []
        }
      },
      props:{
        data:{
          type:Array,
          default:[]
        },
        sort:{
          type:Array,
          default:[]
        }
      },
      components:{
        Scroll
      },
      computed:{
        shortTitleList(){
          return this.sort.map(item => {
            return item.substring(0,1);
          })
        }
      },
      methods:{
        selectItem(item){
          this.$emit('select',item);
        },
        onShortcutTouchStart(e){
          let anchorIndex = getData(e.target,'index');
          this.touch.y1 = e.touches[0].pageY
          this.touch.anchorIndex = anchorIndex;
          this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e){
          let firsttouch = e.touches[0]
          this.touch.y2 = firsttouch.pageY
          let delta = (this.touch.y2 - this.touch.y10) / ANCHOR_HEIGHT | 0;
          let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
          this._scrollTo(anchorIndex)
        },
        _scrollTo(anchorIndex) {
          this.title = this.sort[anchorIndex];
          this.$emit('refreshData',anchorIndex);
        },
        scroll(pos){
          this.scrollY = pos.y
        },
        _calculateHeight(){
          this.listheight = [];
          const list = this.$refs.listGroup
          let height = 0
          this.listheight.push(height);
          for (let i = 0; i < list.length; i++){
            let item = list[i];
            height += item.clientHeight
            this.listheight.push(height)
          }
        }
      },
      watch:{
        data(){
          setTimeout(() =>{
            this._calculateHeight()
          },20)
        },
        scrollY(newY){
          const listheight = this.listheight
          //当滚动到顶部，newY >0
          if (newY > 0) {
            this.currentIndex = 0;
            return
          }
          //在中间部分滚动
          for (let i = 0; i < listheight.length - 1; i++){
            let height1 = listheight[i];
            let height2 = listheight[i + 1];
            if (-newY >= height1 && -newY < height2){
              this.currentIndex = i;
              return;
            }
          }

          //当滚动到底部，且-newY大于最后一个元素的上限
          this.currentIndex = listheight.length - 2;



        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
