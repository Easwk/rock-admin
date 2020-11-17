<template>
  <el-row class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <el-tag
      v-if="
        getSetting('navBarNotice').length > 0 &&
          !getSetting('closeNavNotice') &&
          showNotice(getSetting('navBarNotice'))
      "
      class="notice-setting"
      type="warning"
      closable
      :disable-transitions="false"
      @close="closeNavBarNotice"
    >
      {{ getSetting("navBarNotice") }}
    </el-tag>
    <div class="right-content">
      <el-popover
        placement="bottom"
        width="400"
        trigger="click"
        @show="showPopover"
      >
        <el-badge class="right-item" :is-dot="hasNewMessage">
          <i class="el-icon-bell icon" circle />
        </el-badge>
      </el-popover>
      <div
        v-if="showPageJsonSchemaIcon"
        class="right-item"
        @click="showPageJsonSchema"
      >
        <icon name="code" />
      </div>
      <el-dropdown class="right-item" trigger="click">
        <div class="user-info">
          <img :src="avatar" class="user-avatar" alt="头像" />
          <span class="user-name">{{ name }}</span>
        </div>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item icon="oms-icon-index" @click="$router.push('/')"
            >首页</el-dropdown-item
          >
          <el-dropdown-item divided icon="el-icon-switch-button" @click="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer
      v-if="showJsonSchema"
      :with-header="false"
      size="50%"
    />
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "./Breadcrumb";
import Hamburger from "./Hamburger";
import { showEleByClassName } from "../../../utils";
import Cache from "../../../utils/cache";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showExportPop: false,
      modulesList: this.getSetting("system_module"),
      showJsonSchema: false,
      json: "",
      key: 0
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
    hasNewMessage() {
      return this.$store.state.settings.hasNewMessage;
    },
    moduleName() {
      return this.$store.state.app.moduleName;
    },
    showPageJsonSchemaIcon() {
      return this.$store.state.settings.showPageJsonSchema || false;
    }
  },
  mounted() {
    showEleByClassName("el-submenu is-active");
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    getSetting(name) {
      return this.$store.state.settings[name];
    },
    async closeNavBarNotice() {
      await this.$store.dispatch("settings/changeSetting", {
        key: "closeNavNotice",
        value: true
      });
      this.closeNotice(this.getSetting("navBarNotice"));
    },
    showPopover() {
      this.showExportPop = true;
    },
    goto(url) {
      location.href = url;
    },
    showNotice(text) {
      const key = "dismiss:navbar_notice";
      if (!Cache.exist(key)) {
        return true;
      }
      return Cache.get(key) !== text;
    },
    closeNotice(text) {
      const key = "dismiss:navbar_notice";
      Cache.set(key, text);
    },
    showPageJsonSchema() {
      this.showJsonSchema = true;
      this.json =
        this.$store.state.app.pages[this.$route.path + "/page_info"] || "";
      this.key++;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.notice-setting {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.right-content {
  float: right;
  height: 100%;
  padding-right: 20px;
  color: rgba(0, 0, 0, 0.65);
  display: flex;

  .icon {
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }

  .right-item {
    padding: 0 12px;
    // margin: 0 12px;
    height: 100%;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .user-info {
    height: 50px;
    line-height: 50px;
  }

  .user-avatar {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    margin: 0 10px 0 0;
    color: #1890ff;
    vertical-align: middle;
    background: hsla(0, 0%, 100%, 0.85);
  }

  .user-name {
    vertical-align: middle;
  }
}

.modulesItem {
  &.disabled {
    color: #ccc;
    cursor: not-allowed;

    &:hover {
      background: #fff;
    }
  }
}
</style>
