<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <search-menu v-if="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '../../../styles/variables.scss'
import SearchMenu from './SearchMenu'
export default {
  components: { SidebarItem, Logo, SearchMenu },
  computed: {
    ...mapGetters(['sidebar', 'remoteRouter']),
    routes() {
      return this.$router.options.routes.concat(this.remoteRouter)
    },
    activeMenu() {
      const matched = this.$route.matched

      for (let i = matched.length - 1; i > 0; i--) {
        if (!matched[i].meta.hidden) {
          return matched[i].path
        }
      }

      return this.$route.path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped>
  /*::v-deep(.el-menu-item) {*/
  /*  height: 40px;*/
  /*  line-height: 40px;*/
  /*}*/
  /*::v-deep(.el-submenu__title) {*/
  /*  height: 40px;*/
  /*  line-height: 40px;*/
  /*}*/
  /*::v-deep(.el-submenu .el-menu-item) {*/
  /*  height: 40px;*/
  /*  line-height: 40px;*/
  /*}*/
</style>
