<template>
  <div class="redirect-container">
    <div class="redirect-box">
      <div class="spinner"></div>
      <p>Redirecting, please wait...</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  try {
    const { data: user } = await axios.get('/user');
    console.log(user);

    localStorage.setItem('user_id', user.id);

        await new Promise(resolve => setTimeout(resolve, 2000));


    if (!user.role) {
      localStorage.setItem('onboarding_in_progress', 'true');
      router.push(`/signup/${user.id}`);
    } else {
      localStorage.setItem('user_role', user.role);
      localStorage.removeItem('onboarding_in_progress'); // ✅ done onboarding

      switch (user.role) {
        case 'applicant':
          router.push('/applicantdash');
          break;
        case 'company':
          router.push('/companydash');
          break;
        default:
          router.push('/login');
          break;
      }
    }
  } catch (e) {
        await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/login'); // fallback
  }
});
</script>


<style scoped>
.redirect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
}

.redirect-box {
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.spinner {
  border: 4px solid #e5e7eb;
  border-top: 4px solid #045d56;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
