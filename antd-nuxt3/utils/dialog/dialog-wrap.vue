<template>
  <Modal
    class="ij-dialog-box"
    :visible="true"
    :centered="true"
    v-bind="$parent?.$attrs"
    :destroy-on-close="true"
    @cancel="onCancel"
  >
    <slot />

    <template #footer>
      <slot name="footer">
        <a-button @click="onCancel">
          取消
        </a-button>

        <a-button type="primary" @click="$emit('ok')">
          确认
        </a-button>
      </slot>
    </template>
  </Modal>
</template>

<script lang="ts">
export default { name: 'DialogWrap' }
</script>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
import { getCurrentInstance } from 'vue'

const emit = defineEmits(['ok', 'cancel'])

const ctx = getCurrentInstance()

function onCancel() {
  emit('cancel')
  // hack. 书面规则限制, 才使 parent 可生效
  if (ctx && ctx.parent) {
    ctx.parent.emit('close')
  }
}
</script>

<style lang="less">
.ij-dialog-box {
  .ant-modal-header {
    padding: 16px 24px;
    border-bottom: 1px #eceef4 solid;
  }

  .ant-modal-body {
    padding-top: 16px;
  }
}
</style>
