// Profile Page Logic
let currentUser = null;

function loadProfileData() {
  currentUser = Auth.getCurrentUser();
  console.log('Current user:', currentUser); // Debug log

  if (!currentUser) {
    console.log('No user found, showing notLoggedIn section'); // Debug log
    document.getElementById('notLoggedIn').classList.remove('hidden');
    document.getElementById('profileContent').classList.add('hidden');
    return;
  }

  console.log('User found, showing profile content'); // Debug log
  document.getElementById('notLoggedIn').classList.add('hidden');
  document.getElementById('profileContent').classList.remove('hidden');

  if (!currentUser.avatar || !currentUser.avatar.startsWith('data:image/svg+xml')) {
    currentUser.avatar = Auth.createInitialsAvatar(currentUser.name);
    localStorage.setItem('aurum_auth', JSON.stringify(currentUser));
  }

  document.getElementById('userAvatar').src = currentUser.avatar;
  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('userEmail').textContent = currentUser.email;
  document.getElementById('userType').textContent = currentUser.userType ? `User Type: ${currentUser.userType}` : '';
  document.getElementById('joinedDate').textContent = `${t('joined')} ${currentUser.joinedDate}`;
  document.getElementById('ordersCount').textContent = currentUser.ordersPlaced;
  document.getElementById('donationsCount').textContent = currentUser.itemsDonated;
  document.getElementById('impactCount').textContent = (currentUser.ordersPlaced + currentUser.itemsDonated) * 2;

  // Show/hide sections based on user role
  const userRole = currentUser.userType;
  
  // For charity users: hide shopping/donation sections, show charity dashboard
  const recentPurchasesSection = document.querySelector('#profileContent > div:nth-child(4)');
  const donationsMadeSection = document.querySelector('#profileContent > div:nth-child(5)');
  const browseShopBtn = document.querySelector('a[href="productes.html"]');
  const donateNowBtn = document.querySelector('a[href="donate.html"]');
  
  if (userRole === 'charity') {
    // Hide shopping and donation sections for charity users
    if (recentPurchasesSection) recentPurchasesSection.classList.add('hidden');
    if (donationsMadeSection) donationsMadeSection.classList.add('hidden');
    if (browseShopBtn) browseShopBtn.classList.add('hidden');
    if (donateNowBtn) donateNowBtn.classList.add('hidden');
    
    // Update stats for charity - show received donations instead
    document.getElementById('ordersCount').textContent = '0';
    document.getElementById('donationsCount').textContent = currentUser.itemsDonated || '0';
    document.getElementById('impactCount').textContent = (currentUser.itemsDonated || 0) * 3;
  } else {
    // Show shopping and donation sections for individual/donor users
    if (recentPurchasesSection) recentPurchasesSection.classList.remove('hidden');
    if (donationsMadeSection) donationsMadeSection.classList.remove('hidden');
    if (browseShopBtn) browseShopBtn.classList.remove('hidden');
    if (donateNowBtn) donateNowBtn.classList.remove('hidden');
  }

  loadRecentPurchases();
  loadDonations();
}

function loadRecentPurchases() {
  try {
    const cart = JSON.parse(localStorage.getItem('aurum_cart')) || [];
    const container = document.getElementById('recentPurchases');

    if (cart.length === 0) {
      container.innerHTML = '<p class="text-gray-400 text-sm">No purchases yet. <a href="productes.html" class="accent hover:underline">Start shopping</a></p>';
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 py-3 border-b border-[#222] last:border-b-0">
        <img src="${item.img}" class="w-12 h-12 rounded object-cover" loading="lazy" onerror="this.style.background='#252525'">
        <div class="flex-1">
          <p class="text-sm font-medium">${item.n}</p>
          <p class="text-xs text-gray-400">$${item.price} × ${item.qty}</p>
        </div>
      </div>
    `).join('');
  } catch (e) {
    document.getElementById('recentPurchases').innerHTML = '<p class="text-gray-400 text-sm">No purchases yet. <a href="productes.html" class="accent hover:underline">Start shopping</a></p>';
  }
}

function loadDonations() {
  try {
    const donations = JSON.parse(localStorage.getItem('aurum_donations')) || [];
    const currentUser = Auth.getCurrentUser();
    const container = document.getElementById('donationsMade');

    // Filter donations for current user if logged in
    let userDonations = donations;
    if (currentUser) {
      userDonations = donations.filter(d => d.userId === currentUser.id || d.userName === currentUser.name);
    }

    if (userDonations.length === 0) {
      container.innerHTML = '<p class="text-gray-400 text-sm">No donations yet. <a href="donate.html" class="accent hover:underline">Make your first donation</a></p>';
      return;
    }

    // Sort by timestamp descending and show last 10
    const recentDonations = userDonations
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 10);

    container.innerHTML = recentDonations.map(donation => {
      // Get product name if this is a product donation, otherwise use the type
      const displayName = donation.productName ? donation.productName : (donation.type ? `${donation.type} Clothing` : 'Donation');
      const displayCharity = donation.charityName || donation.charity || 'General';
      const itemCount = donation.items || donation.quantity || '1';
      const displayDesc = donation.productDesc ? `${donation.productDesc.substring(0, 60)}...` : '';
      const productImg = donation.productImg || 'https://via.placeholder.com/80x80?text=Donation';
      
      return `
        <div class="bg-card border border-[#222] rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-300">
          <div class="flex items-start gap-4">
            <img src="${productImg}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" onerror="this.src='https://via.placeholder.com/80x80?text=Donation'">
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold mb-1 truncate">${displayName}</h3>
              ${displayDesc ? `<p class="text-xs text-gray-400 mb-2 line-clamp-2">${displayDesc}</p>` : ''}
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-400">
                  <p class="mb-1">${itemCount} items donated</p>
                  <p class="mb-1">${donation.date}</p>
                  <p class="accent font-medium">${displayCharity}</p>
                </div>
                <div class="flex items-center gap-2">
                  ${donation.message ? `<span class="text-xs text-gray-500 italic">Message included</span>` : ''}
                  <span class="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">✓ Donated</span>
                </div>
              </div>
              ${donation.message ? `<p class="text-xs text-gray-500 mt-2 italic border-t border-[#222] pt-2">"${donation.message}"</p>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Error loading donations:', e);
    document.getElementById('donationsMade').innerHTML = '<p class="text-gray-400 text-sm">No donations yet. <a href="donate.html" class="accent hover:underline">Make your first donation</a></p>';
  }
}

// Auth Modal Functions
const REGISTER_TYPE_KEY = 'aurum_register_type';
let selectedRegisterUserType = localStorage.getItem(REGISTER_TYPE_KEY) || 'individual';

function openAuthModal() {
  document.getElementById('authModal').classList.add('active');
  renderRegisterFields();
  attachRegisterTypeListeners();
  highlightSelectedRegisterType();
  if (window.lucide) lucide.createIcons();
}

function closeAuthModal(event) {
  if (event && event.target !== document.getElementById('authModal') && event.target !== document.querySelector('#authModal > div > div > button')) return;
  document.getElementById('authModal').classList.remove('active');
}

function toggleAuthForm() {
  document.getElementById('signInForm').classList.toggle('hidden');
  document.getElementById('registerForm').classList.toggle('hidden');
  document.getElementById('signInError').textContent = '';
  document.getElementById('registerError').textContent = '';
  renderRegisterFields();
  attachRegisterTypeListeners();
  highlightSelectedRegisterType();
}

function saveRegisterType() {
  try {
    localStorage.setItem(REGISTER_TYPE_KEY, selectedRegisterUserType);
  } catch (e) {}
}

function setRegisterType(type) {
  selectedRegisterUserType = type;
  saveRegisterType();
  highlightSelectedRegisterType();
  renderRegisterFields();
}

function highlightSelectedRegisterType() {
  document.querySelectorAll('.register-user-type-btn').forEach(btn => {
    if (btn.dataset.type === selectedRegisterUserType) {
      btn.style.backgroundColor = 'rgb(51, 153, 255)';
      btn.style.borderColor = 'rgb(51, 153, 255)';
      btn.style.color = 'white';
    } else {
      btn.style.backgroundColor = 'transparent';
      btn.style.borderColor = '#333';
      btn.style.color = '#9ca3af';
    }
  });

  const descriptionKeys = {
    individual: 'desc_individual',
    donor: 'desc_donor',
    charity: 'desc_charity'
  };
  const descEl = document.getElementById('registerTypeDescription');
  if (descEl) descEl.textContent = t(descriptionKeys[selectedRegisterUserType]) || '';
}

function attachRegisterTypeListeners() {
  // لا نحتاج بعد الآن لأننا استخدمنا onclick inline
}

function handleUserTypeSelect(type) {
  setRegisterType(type);
}

function renderRegisterFields() {
  const container = document.getElementById('registerFields');
  if (!container) return;

  const fieldBase = (labelKey, fallbackLabel, id, type = 'text', required = true) => `
    <div class="field opacity-0 translate-y-2 transition-all duration-300">
      <label class="block text-sm font-medium text-gray-300 mb-2" data-i18n="${labelKey}">${fallbackLabel}</label>
      <input id="${id}" class="form-input w-full" type="${type}" data-i18n-placeholder="${labelKey}" placeholder="${fallbackLabel}" ${required ? 'required' : ''}>
    </div>`;

  const fields = [];

  if (selectedRegisterUserType === 'charity') {
    fields.push(fieldBase('org_name', 'Organization Name', 'registerName', 'text'));
    fields.push(fieldBase('email', 'Email', 'registerEmail', 'email'));
    fields.push(fieldBase('checkout_address', 'Address', 'registerAddress', 'text'));
    fields.push(fieldBase('password', 'Password', 'registerPassword', 'password'));
  } else if (selectedRegisterUserType === 'donor') {
    fields.push(fieldBase('checkout_full_name', 'Full Name', 'registerName', 'text'));
    fields.push(fieldBase('email', 'Email', 'registerEmail', 'email'));
    fields.push(fieldBase('checkout_phone', 'Phone Number', 'registerPhone', 'tel'));
    fields.push(fieldBase('checkout_address', 'Address', 'registerAddress', 'text'));
    fields.push(fieldBase('password', 'Password', 'registerPassword', 'password'));
  } else {
    // individual
    fields.push(fieldBase('checkout_full_name', 'Full Name', 'registerName', 'text'));
    fields.push(fieldBase('email', 'Email', 'registerEmail', 'email'));
    fields.push(fieldBase('password', 'Password', 'registerPassword', 'password'));
  }

  container.innerHTML = fields.join('');
  
  // Re-apply translations for dynamically generated HTML
  if (typeof applyLang === 'function') {
    applyLang(container);
  } else {
    try { applyLang(); } catch(e) {}
  }

  requestAnimationFrame(() => {
    container.querySelectorAll('.field').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-2');
    });
  });
}

function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  if (!email || !password) {
    document.getElementById('signInError').textContent = 'Please fill in all fields.';
    return;
  }

  const result = Auth.login(email, password);
  if (result.success) {
    showToast('Successfully logged in!');
    setTimeout(() => {
      closeAuthModal();
      window.location.href = 'index.html';
    }, 1500);
  } else {
    document.getElementById('signInError').textContent = result.message;
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('registerName')?.value || '';
  const email = document.getElementById('registerEmail')?.value || '';
  const address = document.getElementById('registerAddress')?.value || '';
  const password = document.getElementById('registerPassword')?.value || '';
  const userType = selectedRegisterUserType || 'individual';

  const requiredInputs = Array.from(document.querySelectorAll('#registerFields [required]'));
  const invalid = requiredInputs.some(input => !input.value.trim());
  if (invalid) {
    document.getElementById('registerError').textContent = 'Please fill in all required fields.';
    return;
  }

  const result = Auth.register(name, email, password, userType);
  if (result.success) {
    showToast('Account created successfully!');
    setTimeout(() => {
      closeAuthModal();
      window.location.href = 'index.html';
    }, 1500);
  } else {
    document.getElementById('registerError').textContent = result.message;
  }
}

function handleLogout() {
  const isDark = document.body.classList.contains('dark-mode');
  Swal.fire({
    title: 'Logout',
    text: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(51, 153, 255)',
    cancelButtonColor: isDark ? '#333333' : '#e5e7eb',
    background: isDark ? '#1a1a1a' : '#ffffff',
    color: isDark ? '#ffffff' : '#111111',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      Auth.logout();
      showToast('Logged out successfully.');
      setTimeout(() => window.location.href = 'index.html', 1500);
    }
  });
}

function openAccountSettings() {
  const isDark = document.body.classList.contains('dark-mode');
  Swal.fire({
    title: 'Coming Soon!',
    text: 'Account Settings page coming soon! Currently you can only update your profile through logout/login.',
    icon: 'info',
    confirmButtonColor: 'rgb(51, 153, 255)',
    background: isDark ? '#1a1a1a' : '#ffffff',
    color: isDark ? '#ffffff' : '#111111'
  });
}

// Initialize profile on page load
window.addEventListener('DOMContentLoaded', () => {
  loadProfileData();
  attachRegisterTypeListeners();
  highlightSelectedRegisterType();
  if (window.lucide) lucide.createIcons();
  
  if (window.location.search.includes('action=login') && !Auth.getCurrentUser()) {
    setTimeout(openAuthModal, 300);
  }
});
