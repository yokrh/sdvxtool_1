<template>
  <nav class="app-header">
    <ul class="tabs">
      <li class="tab" @click="emitChangeAppContentType('trackSearch')">
        <span class="icon-search"></span>Search
      </li>
      <li class="tab" @click="emitChangeAppContentType('weekly')">
        <span class="icon-weekly"></span>Weekly
      </li>
      <li class="tab" @click="emitChangeAppContentType('links')">
        <span class="icon-link"></span>Links
      </li>
    </ul>
  </nav>
</template>

<script>
import vm from '../client';
export default{
  methods: {
    emitChangeAppContentType(newAppContentType){
      this.$emit('change-app-content-type', newAppContentType);
    }
  }
};
</script>

<style scoped>
.app-header {
  margin-bottom: 1px;
  .icon-search {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-search.png");
  }
  .icon-link {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-link.png");
  }
  .icon-twitter {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-twitter.png");
  }
  .icon-weekly {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-weekly.png");
  }
  .tabs {
    border-bottom: 2px solid #dedede;
    .tab {
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: 33.3%;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      border: 1px solid #efefef;
    }
  }
}
</style>
