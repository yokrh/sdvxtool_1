<template>
  <div class="track-search">
    <h1 class="page-title">譜面検索</h1>
    <form class="track-search-form" @submit.prevent="onSubmit">
      <dl class="levels">
        <dt class="title">LEVEL</dt>
        <dd class="level" v-for="level in levels">
          <label><input type="radio" name="level" :value="level" v-model="selectedLevel" @change="fetchTracks">{{level}}</label>
        </dd>
      </dl>
      <dl class="difficulties">
        <dt class="title">難易度</dt>
        <dd class="difficulty" v-for="difficulty in difficulties">
          <label><input type="checkbox" name="hard" :value="difficulty" v-model="selectedDifficulties"  @change="filterTracks">{{difficulty}}</label>
        </dd>
      </dl>
      <input class="track-name-input" type="text" placeholder="曲名" v-model="inputTrackName" @keyup="filterTracks" @change="filterTracks" />
    </form>
    <ul class="tracks">
      <template v-if="tracks.length > 0">
        <li class="track" v-for="track in tracks.slice(0, 10)">
          <a :href="'http://www.sdvx.in' + track.path + '.htm'">{{track.name}}</a>
        </li>
      </template>
      <template v-else-if="selectedLevel">
        <li class="track">
          <a :href="'http://www.sdvx.in/sort/sort_' + selectedLevel + '.htm'">Level {{selectedLevel}} トップ</a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default{
  data() {
    return {
      levels: [15, 16, 17, 18, 19, 20],
      difficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      selectedLevel: 18,
      selectedDifficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      inputTrackName : '',
      allTracks: [],
      tracks: []
    };
  },
  mounted() {
    this.fetchTracks();
  },
  methods: {
    // 検索時処理
    onSubmit() {
      window.scrollTo(0, 500);
      document.activeElement.blur();
    },
    // 指定したlevelの全trackを取得
    fetchTracks() {
      this.allTracks = [];
      const url = '/api/track/list?level=' + this.selectedLevel;
      const self = this;
      fetch(url).then(function(res) {
        return res.json();
      }).then(function(json){
        self.allTracks = json;
        self.filterTracks();
      });
    },
    // 全trackの中から指定したname, level, difficultyのtrackを抽出
    filterTracks() {
      this.tracks = [];
      if (this.inputTrackName) {
        this.tracks = this.allTracks;
        // name
        this.tracks = this.tracks.filter((track) => track.name.toLowerCase().includes(this.inputTrackName.toLowerCase()));
        if (this.selectedLevel) {
          // level
          this.tracks = this.tracks.filter((track) => track.level == this.selectedLevel);
        }
        if (this.selectedDifficulties.length > 0) {
          const self = this;
          // difficulty
          this.tracks = this.tracks.filter(function(track){
            return self.selectedDifficulties.some((selectedDifficulty) => track.difficulty == selectedDifficulty);
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.track-search {
  padding: 4px 2%;
  .page-title {
    text-align: center;
    padding: 8px 0 16px 0;;
    font-size: 24px;
    color: #555;
  }
  .track-search-form {
    .levels {
      padding: 8px 2%;
      .title {
        padding: 8px 0;
        font-size: 12px;
      }
      .level {
        display: inline-block;
        padding-left: 8%;
        width: 25.3%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .difficulties {
      padding: 4px 2%;
      .title {
        padding: 8px 0;
        font-size: 12px;
      }
      .difficulty {
        display: inline-block;
        padding-left: 3%;
        width: 22%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .track-name-input {
      margin-top: 16px;
      padding: 4px 2%;
      width: 96%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border: 1px solid #bebebe;
      border-radius: 2px;
    }
  }
  .tracks {
    padding-top: 16px;
    .track {
      padding: 8px 4%;
      font-size: 12px;
      &:first-child {
        padding-top: 16px;
      }
    }
  }
}
</style>
