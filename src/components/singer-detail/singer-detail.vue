<template>
  <transition name="slide">
          <music-list :title="title" :bg-image="bgImage" :songs="song"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "../../api/singer";
  import {ERR_OK} from "../../api/config";
  import {createSong} from "../../common/js/song";
  import MusicList from 'components/music-list/music-list'
  export default {
    data(){
      return {
        song: []
      }
    },
    components:{
      MusicList
    },
    computed: {
      title(){
        return this.singer.singer_name
      },
      bgImage(){
        return this.singer.singer_pic
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getSingDetail();
    },
    methods:{
      _getSingDetail(){
        if ( !this.singer.singer_mid ) {
          this.$router.push('/singer')
          return;
        }
        getSingerDetail(this.singer.singer_mid).then(result => {
            if (result.code === ERR_OK) {
              this.song = this._normalizeSongs(result.data.list)

            }
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach(item =>{
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition : all 0.3s

  .slide-enter, .slide-leave-to
    transform :translate3d(100%,0,0)
</style>
