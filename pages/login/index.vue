<template>
  <section class="login-container">
    <h1 class="login-title">{{ $t('login.title') }}</h1>
    <el-form ref="form" :model="form" size="small" class="login-form">
      <p class="form-text">{{ $t('login.text') }}</p>
      <el-form-item class="form-item">
        <el-input
          v-model="form.name"
          :placeholder="$t('login.name')"
          prefix-icon="el-icon-user"
          clearable
        />
      </el-form-item>
      <el-form-item class="form-item">
        <el-input
          v-model="form.password"
          :placeholder="$t('login.password')"
          prefix-icon="el-icon-lock"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item class="form-item">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="form.code"
              :placeholder="$t('login.code')"
              prefix-icon="el-icon-message"
              clearable
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form-item">
        <el-checkbox v-model="isRemember">
          {{ $t('login.remember') }}
        </el-checkbox>
      </el-form-item>
      <el-button
        class="form-submit"
        type="primary"
        size="small"
        @click="doSubmit"
      >
        {{ $t('login.btn') }}
      </el-button>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: '',
        code: '',
      },
      isRemember: false,
    }
  },
  head() {
    return {
      title: this.$t('login.title'),
    }
  },
  methods: {
    async doSubmit() {
      if (this.form.name.length === 0) {
        this.$message.error(this.$t('login.errorName'))
        return false
      }

      if (this.form.password.length === 0) {
        this.$message.error(this.$t('login.errorPassword'))
        return false
      }

      if (this.form.code.length === 0) {
        this.$message.error(this.$t('login.errorCode'))
        return false
      }

      const { code, msg, data } = await this.$axios.post(
        '/api/auth/login',
        this.form
      )
      if (code === 0) {
        this.$message.success(msg)

        // eslint-disable-next-line no-console
        console.log(data)

        const path = this.$route.query.redirect
        if (path) {
          this.$router.replace(path)
        } else {
          this.$router.go(-1)
        }
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-title {
  font-size: 30px;
  font-weight: lighter;
  text-align: center;
}

.login-form {
  background-color: #fff;
  padding: 10px;
  margin: 10px auto;
  width: 300px;
  box-sizing: border-box;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.form-text {
  text-align: center;
  font-size: inherit;
  line-height: 2;
  margin-bottom: 10px;
}

.form-submit {
  width: 100%;
  display: block;
}
</style>
