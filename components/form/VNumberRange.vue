<template>
  <div
    ref="wrapper"
    class="v-input-range"
    :class="{ isFocus: isFocus }"
    @clickoutside="isFocus = false"
    :style="{ width: width }"
  >
    <el-input
      v-model="localValue[0]"
      class="range-start"
      @focus="active(true)"
      @change="onchange"
      @input="v => input(v, 0)"
      :disabled="disabled"
    />
    <el-input
      tabindex="1"
      class="range-split"
      placeholder="~"
      readonly
      :disabled="true"
    />
    <el-input
      v-model="localValue[1]"
      class="range-end"
      @focus="active(true)"
      @change="onchange"
      @input="v => input(v, 1)"
      :disabled="disabled"
    />
    <el-input
      v-if="unit"
      class="range-unit"
      placeholder="~"
      readonly
      :disabled="true"
    ></el-input>
  </div>
</template>
<script>
import { isArray } from "../../utils";
import useClickOutside from "../../utils/clickoutside";

export default {
  name: "VRangeNumber",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [Array, String],
      default: ","
    },
    disabled: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "350px"
    }
  },
  setup() {
    const wrapper = useClickOutside();
    return {
      wrapper
    };
  },
  data() {
    let startValue, endValue;
    if (isArray(this.$props.modelValue)) {
      [startValue, endValue] = this.$props.modelValue.map(val => Number(val));
    } else {
      [startValue, endValue] = this.$props.modelValue.split(",");
    }
    return {
      localValue: this.arrToNum([startValue, endValue]),
      isFocus: false
    };
  },
  methods: {
    input(v, index) {
      this.localValue[index] = this.varToNum(v);
    },
    active(status) {
      this.isFocus = !!status;
    },
    varToNum(v) {
      return (v + "").replace(/[^\d.]/g, "").replace(/\.+/, ".");
    },
    arrToNum(arr) {
      return arr.map(item => {
        let v = this.varToNum(item);
        return Number(v);
      });
    },
    onchange() {
      this.localValue = this.arrToNum(this.localValue);
      this.$emit("update:modelValue", this.localValue);
    }
  }
};
</script>
<style lang="scss" scoped>
.v-input-range {
  font-size: 0;
  padding: 0 15px;

  &:hover {
    ::v-deep {
      .range-split input,
      .range-start input,
      .range-end input {
        border-color: #c0c4cc;
      }
    }
  }

  &.isFocus {
    ::v-deep {
      .range-split input,
      .range-start input,
      .range-end input {
        border-color: #409eff;
      }
    }
  }
}

::v-deep(.range) {
  &-split,
  &-start,
  &-end {
    display: inline-block;

    input {
      text-align: center;
    }
  }

  &-split {
    width: 10%;

    input {
      border-left: none;
      border-right: none;
      border-radius: 0;
      padding: 0;
      position: relative;
      z-index: 2;
      cursor: auto;

      &:focus,
      &:hover {
        border-color: #dcdfe6;
      }
    }
  }

  &-start {
    width: 40%;
    margin-left: -15px;

    input {
      border-right: none;
      border-radius: 4px 0 0 4px;
    }
  }

  &-end {
    margin-right: -15px;
    width: 40%;

    input {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
  }

  &-unit {
    width: 10%;
    margin-right: -15px;

    input {
      padding: 0;
      position: relative;
      z-index: 2;
      text-align: center;
      cursor: auto;

      &:focus,
      &:hover {
        border-color: #dcdfe6;
      }
    }
  }
}
</style>
