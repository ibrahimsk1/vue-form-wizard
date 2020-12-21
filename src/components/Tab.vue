<template>
<div v-show="selected">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'tab',
    props: {
        title: {
            default: ""
        },
        selected: {
            default: false
        },
        icon_class:{
            default:""
        },
        satisfied:{
            type: Function,
            default: () => {
                return true;
            }
        }
    },

}
</script>

<style>
</style>
