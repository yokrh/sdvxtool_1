<template>
  <div class="app-content">
    <template v-if="appContentType === 'trackSearch'">
      <trackSearch></trackSearch>
    </template>
    <template v-else-if="appContentType === 'weekly'">
      <weekly></weekly>
    </template>
    <template v-else-if="appContentType === 'links'">
      <links></links>
    </template>
    <template v-else>
      https://p.eagate.573.jp/game/bemani/hinabita/p/index.html
      https://www7.atwiki.jp/bemanilyrics/pages/2021.html
    </template>
  </div>
</template>

<script>
import trackSearch from './trackSearch.vue'
import weekly from './weekly.vue'
import links from './links.vue'
export default{
  components: {
    trackSearch,
    links,
    weekly
  },
  props: ['appContentType']
};
</script>

<style scoped>
  .app-content {
    padding: 16px 2%;
  }
</style>
