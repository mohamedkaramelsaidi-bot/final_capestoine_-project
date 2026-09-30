// Authentication System
const AUTH_KEY = 'aurum_auth';
const USERS_KEY = 'aurum_users';

class Auth {
  static getCurrentUser() {
    try {
      const auth = localStorage.getItem(AUTH_KEY);
      return auth ? JSON.parse(auth) : null;
    } catch (e) {
      return null;
    }
  }

  static isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  static register(name, email, password, userType = 'individual') {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required.' };
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: 'Invalid email address.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    try {
      const users = this.getAllUsers();
      if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered.' };
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        userType,
        avatar: this.createInitialsAvatar(name),
        ordersPlaced: Math.floor(Math.random() * 15),
        itemsDonated: Math.floor(Math.random() * 25),
        joinedDate: new Date().toLocaleDateString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      this.login(email, password);
      return { success: true, message: 'Registration successful!' };
    } catch (e) {
      return { success: false, message: 'Registration failed.' };
    }
  }

  static login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required.' };
    }

    try {
      const users = this.getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { success: false, message: 'Invalid email or password.' };
      }

      const sessionUser = { ...user };
      delete sessionUser.password;
      sessionUser.avatar = this.createInitialsAvatar(user.name);
      localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
      return { success: true, message: 'Login successful!', user: sessionUser };
    } catch (e) {
      return { success: false, message: 'Login failed.' };
    }
  }

  static createInitialsAvatar(name) {
    const trimmedName = (name || '').trim();
    const words = trimmedName.split(/\s+/).filter(Boolean);
    const initials = words.length > 1
      ? words.slice(0, 2).map(word => word[0]).join('').toUpperCase()
      : trimmedName.slice(0, 2).toUpperCase();

    const colors = ['#3366FF', '#0056CC', '#1E293B', '#0F172A', '#4338CA'];
    const color = colors[(initials.charCodeAt(0) || 0) % colors.length];

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
      <rect width="100%" height="100%" fill="${color}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit, sans-serif" font-size="110" fill="#ffffff" font-weight="700">${initials}</text>
    </svg>`;

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  }

  static logout() {
    try {
      localStorage.removeItem(AUTH_KEY);
      // Redirect to home page after logout
      window.location.href = 'index.html';
      return { success: true, message: 'Logged out successfully.' };
    } catch (e) {
      return { success: false, message: 'Logout failed.' };
    }
  }

  static getAllUsers() {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  }

  // Check authentication and redirect if not logged in
  static checkAuthenticated() {
    if (!this.isLoggedIn()) {
      // Redirect to home with message
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPage !== 'index.html') {
        localStorage.setItem('redirectAfterLogin', currentPage);
        window.location.href = 'index.html';
      }
      return false;
    }
    return true;
  }

  // Get user role
  static getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.userType : null;
  }

  // Check if user has specific role
  static hasRole(role) {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  static updateUserStats(userId, stats) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) return false;

      users[userIndex] = { ...users[userIndex], ...stats };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const auth = this.getCurrentUser();
      if (auth && auth.id === userId) {
        const updated = { ...auth, ...stats };
        localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
