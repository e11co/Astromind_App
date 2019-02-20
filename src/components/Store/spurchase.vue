<template>
<div id="list">
  <div id="block">
    <el-pagination
    :page-size="6"
    :pager-count="5"
    layout="prev, pager, next"
    :total="120">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
    name:"spurchase",
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#block{
	width:18.75rem;
	text-align: center;
}
</style>