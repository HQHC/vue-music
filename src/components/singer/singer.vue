<template>
    <div class="singer">
      <list-view 
        :sort="sort"
        :data="singer"
        @refreshData="_refreshData"
        @select="selectSinger"
      ></list-view>
      <loading v-show="singer.length === 0"></loading>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from '../../api/singer';
import {ERR_OK} from '../../api/config';
import ListView from '../../base/listview/listview';
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
import Loading from '../../base/loading/loading'

export default {
    data(){
      return{
        singer: [],
        sort:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      }
    },
    components:{
      ListView,
      Loading
    },
    created(){
      this._getSingerList()
    },
    methods:{
      selectSinger(singer){
        this.setSinger(singer)
        this.$router.push({
          path:`/singer/${singer.singer_mid}`
        })

      },
      _getSingerList (index = -100){
          getSingerList(index).then((res) => {
            if (res.code === ERR_OK) {
              this.singer = this._normalSinger(res.singerList.data.singerlist);
            }
          }).catch((err) => {
            
          });
      },
      _normalSinger(data){
        data.forEach(item => {
          item.singer_pic = item.singer_pic.replace('webp','jpg').replace('http:','') + '?max_age=2592000';
        })
        return data;
      },
      _refreshData(index){
        if (index === 0){
          this._getSingerList();
        }else{
          this._getSingerList(parseInt(index));
        }
        
      },
      ...mapMutations({
        setSinger : 'SET_SINGER'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
      position: fixed
      z-index 2
      top:88px
      bottom 0
      width: 100%
</style>
