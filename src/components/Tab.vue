<template>
<div>
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'tab',
    props: {
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
