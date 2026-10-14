// Load SweetAlert2 globally
if (!document.getElementById('swal-script')) {
  const swalScript = document.createElement('script');
  swalScript.id = 'swal-script';
  swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(swalScript);
}

// Force login before entering the site
(function checkAuthRedirect() {
  const isProfilePage = window.location.pathname.endsWith('profile.html');
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
  const isLoginRelated = window.location.pathname.endsWith('login.html');
  
  const authData = localStorage.getItem('aurum_auth');
  
  if (!isProfilePage && !isLoginRelated && !authData) {
    window.location.href = 'profile.html?action=login';
  }
})();

// ===== GLOBAL UTILITIES & HELPERS =====

// Global translation function
function t(key) {
  // Try to get from window.translations if available
  if (typeof window.translations !== 'undefined' && window.lang) {
    return window.translations[window.lang][key] || window.translations.en[key] || key;
  }
  return key;
}

// Show toast notification
function showToast(message) {
  let toastEl = document.getElementById('toast');
  
  if (!toastEl) {
    const newToast = document.createElement('div');
    newToast.id = 'toast';
    newToast.className = 'toast';
    document.body.appendChild(newToast);
    toastEl = newToast;
  }
  
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

// Validate email format
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear all error messages
function clearErrors() {
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('border-red-500'));
}

// Show error for specific field
function showError(id, message) {
  const errorEl = document.getElementById(`error${id.charAt(0).toUpperCase() + id.slice(1)}`);
  const field = document.getElementById(id);
  if (errorEl) errorEl.textContent = message;
  if (field) field.classList.add('border-red-500');
}

// Check if page requires authentication
function checkAuthenticationRequired() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (typeof Auth !== 'undefined') {
    return Auth.isLoggedIn();
  }
  return false;
}

// Get user role
function getUserRole() {
  if (typeof Auth !== 'undefined') {
    return Auth.getUserRole();
  }
  return null;
}

// Check if user is authenticated
function isAuthenticated() {
  return typeof Auth !== 'undefined' && Auth.isLoggedIn();
}

// Get current user
function getCurrentUser() {
  if (typeof Auth !== 'undefined') {
    return Auth.getCurrentUser();
  }
  return null;
}

// Update navbar based on authentication status
function updateNavbarAuth() {
  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();
  const userRole = getUserRole();
  document.body.classList.toggle('charity-user', userRole === 'charity');
  
  // Update profile button
  const profileBtn = document.querySelector('button[onclick="handleProfileClick()"]');
  if (profileBtn) {
    if (isLoggedIn && currentUser) {
      profileBtn.title = `Logged in as ${currentUser.name}`;
    } else {
      profileBtn.title = 'Sign in';
    }
  }
  
  // Control visibility of donate link and donate buttons based on role
  const donateLink = document.querySelector('a[href="donate.html"]');
  if (donateLink) {
    // Show donate link only for `donor` users. Hide for `individual` and `charity`.
    if (userRole === 'donor') {
      donateLink.style.display = '';
    } else {
      donateLink.style.display = 'none';
    }
  }

  // Hide any donate buttons placed on cards (class `d-btn`) for individual and charity users
  const donateBtns = document.querySelectorAll('.d-btn');
  donateBtns.forEach(btn => {
    if (userRole === 'individual' || userRole === 'charity') btn.style.display = 'none';
    else btn.style.display = '';
  });

  // Also hide any buttons that open the donation modal (openDonationModal)
  const openDonationBtns = document.querySelectorAll('button[onclick*="openDonationModal"]');
  openDonationBtns.forEach(btn => {
    if (userRole === 'individual' || userRole === 'charity') btn.style.display = 'none';
    else btn.style.display = '';
  });

  // If we're on the donate page, hide the donation form card for individual users
  const donationCard = document.querySelector('.donation-form-card');
  if (donationCard) {
    if (userRole === 'individual') {
      donationCard.style.display = 'none';
    } else {
      donationCard.style.display = '';
    }
  }
  
  // Control visibility of Our Charities link for charity users only
  const ourCharitiesLink = document.querySelector('a[href="ourcharities.html"]');
  if (ourCharitiesLink) {
    // Show Our Charities link ONLY for charity users
    // Hide for individual and donor users
    if (userRole === 'charity') {
      ourCharitiesLink.style.display = '';
    } else {
      ourCharitiesLink.style.display = 'none';
    }
  }
  
  // Control visibility of about link for charity users
  const aboutLink = document.querySelector('a[href="about.html"]');
  if (aboutLink) {
    // Show about link for everyone
    aboutLink.style.display = '';
  }
}

// Initialize page on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Update navbar based on auth status
  updateNavbarAuth();
  
  // Initialize lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Re-update navbar when auth changes
window.addEventListener('storage', (e) => {
  if (e.key === 'aurum_auth' || e.key === 'aurum_users') {
    updateNavbarAuth();
  }
});
