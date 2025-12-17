<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>首頁</h3>
        </div>
        <div class="footer-section">
          <h3>關於伴</h3>
        </div>
        <div class="footer-section">
          <h3>伴消息</h3>
        </div>
        <div class="footer-section">
          <h3>伴團隊</h3>
        </div>
        <div class="footer-section">
          <h3>伴空間</h3>
        </div>
        <div class="footer-section">
          <h3>伴服務</h3>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 School Counselor. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
.app-footer {
  background-color: #dc6e31;
  color: #ccc;
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.footer-section h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #667eea;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.footer-bottom {
  text-align: center;
  color: #fff;
  p{
    margin: 0;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
