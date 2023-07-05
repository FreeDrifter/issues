## JS 打开弹框

使用 JS 开启弹框

### 使用方法

`注:`

1. 组件编写时, 必须使用 DialogWrap 包裹. 如: <DialogWrap>xxxx</DialogWrap>
2. DialogWrap 参数与 [AntDesign Modal](https://www.antdv.com/components/modal-cn) 一致
3. 组件内可调用 emit('close') 关闭弹框
4. loadDialog 调用可参考 vue [h 函数](https://cn.vuejs.org/api/render-function.html#h)

```js
loadDialog(PreviewDialog, {
    type: ActionType.MODIFY,
    id: 'x',
    onSuccess: () => { // 事件
        // do something
    }
})
```

**PreviewDialog 实现示例:**

```html
<template>
    <DialogWrap :width="853" @ok="save">
        <div>
            <h2>标题</h2>
            <p>内容</p>
        </div>

        <template #footer>
            <!-- emit('close') 执行后此组件即销毁  -->
            <a-button @click="$emit('close')">取消</a-button>
            <a-button type="primary" @click="onConfirmClick">确认</a-button>
        </template>
    </DialogWrap>
</template>

<script lang="ts" setup>
// 注: loadDialog 调用此组件时, 传入 onSuccess: function() {} 即可捕获 success 事件
const emit = defineEmits(['success', 'close'])

function onConfirmClick() {
    emit('success')
}
</script>
```

### DialogWrap

参数与 [AntDesign Modal](https://www.antdv.com/components/modal-cn) 一致

`封装弹框组件时, 需要 DialogWrap 包裹的原因:`

1. 使弹框组件可在内部控制 确定、取消等操作. 而不是外部调用时传入
2. 提供自定义弹框 footer 的功能
