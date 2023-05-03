<template>
  <aws-sdk-file-upload/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import AwsSdkFileUpload from '@/components/AwsSdkFileUpload.vue'
  export default Vue.extend({
    name: 'AWS_s3_test',
    components: {
        AwsSdkFileUpload,
    },
  })
</script>