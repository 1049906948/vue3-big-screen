<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  // 登录逻辑
  console.log('登录', { email: email.value, password: password.value })
}

const goToRegister = () => {
  // 跳转到注册页面
  console.log('跳转到注册')
}
</script>

<template>
  <div class="login-container">
    <!-- 左侧品牌区域 -->
    <div class="brand-section">
      <div class="brand-content">
        <h1 class="brand-logo">innoPara</h1>
        <h2 class="brand-slogan">辅助创新</h2>
        <p class="brand-description">
          呼吸蒸汽与沙尘，匹配时行技术路线<br />
          输出完整解决方案
        </p>
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="form-section">
      <div class="login-card">
        <div class="card-header">
          <h3 class="welcome-title">欢迎回来</h3>
          <p class="welcome-subtitle">请输入您的账号信息以登录</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 账号输入框 -->
          <div class="form-group">
            <label class="form-label">账号</label>
            <input
              v-model="email"
              type="email"
              class="form-input"
              placeholder="example@email.com"
              required
            />
          </div>

          <!-- 密码输入框 -->
          <div class="form-group">
            <label class="form-label">密码</label>
            <div class="password-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <span v-if="showPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
          </div>

          <!-- 忘记密码链接 -->
          <div class="form-footer">
            <a href="#" class="forgot-link">忘记密码?</a>
          </div>

          <!-- 登录按钮 -->
          <button type="submit" class="login-button">登录</button>

          <!-- 注册链接 -->
          <div class="register-section">
            <span class="register-text">还没有账号？</span>
            <a href="#" @click.prevent="goToRegister" class="register-link">
              立即注册
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

/* 左侧品牌区域 */
.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(100px);
}

.brand-content {
  position: relative;
  z-index: 1;
  color: white;
  max-width: 500px;
}

.brand-logo {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.brand-slogan {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.brand-description {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
}

/* 右侧表单区域 */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
}

.card-header {
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 0.95rem;
  color: #666;
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder {
  color: #999;
}

/* 密码输入框 */
.password-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.password-toggle:hover {
  opacity: 1;
}

/* 表单底部 */
.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.5rem;
}

.forgot-link {
  font-size: 0.875rem;
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #1a1a1a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-button:active {
  transform: translateY(0);
}

/* 注册区域 */
.register-section {
  text-align: center;
  font-size: 0.9rem;
}

.register-text {
  color: #666;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.25rem;
  transition: color 0.2s;
}

.register-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .login-container {
    flex-direction: column;
  }

  .brand-section {
    min-height: 300px;
  }

  .brand-logo {
    font-size: 2.5rem;
  }

  .brand-slogan {
    font-size: 1.5rem;
  }

  .brand-description {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .form-section {
    padding: 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>
