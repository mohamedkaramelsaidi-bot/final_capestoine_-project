const AUTH_KEY = 'aurum_auth';
const USERS_KEY = 'aurum_users';

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return [];
  }
}

export class Auth {
  static getCurrentUser() {
    try {
      const value = localStorage.getItem(AUTH_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Unable to read the current user.', error);
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

    const users = readArray(USERS_KEY);
    if (users.some((user) => user.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
      userType,
      avatar: this.createInitialsAvatar(name),
      ordersPlaced: 0,
      itemsDonated: 0,
      joinedDate: new Date().toLocaleDateString(),
    };

    try {
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
      const result = this.login(email, password);
      return result.success
        ? { success: true, message: 'Registration successful!', user: result.user }
        : result;
    } catch (error) {
      console.error('Unable to save the new account.', error);
      return { success: false, message: 'Registration failed.' };
    }
  }

  static login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required.' };
    }

    const user = readArray(USERS_KEY).find(
      (entry) => entry.email === email && entry.password === password,
    );
    if (!user) return { success: false, message: 'Invalid email or password.' };

    const sessionUser = { ...user };
    delete sessionUser.password;
    sessionUser.avatar = this.createInitialsAvatar(user.name);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
      return { success: true, message: 'Login successful!', user: sessionUser };
    } catch (error) {
      console.error('Unable to save the login session.', error);
      return { success: false, message: 'Login failed.' };
    }
  }

  static createInitialsAvatar(name) {
    const trimmedName = (name || '').trim();
    const words = trimmedName.split(/\s+/).filter(Boolean);
    const initials = words.length > 1
      ? words.slice(0, 2).map((word) => word[0]).join('').toUpperCase()
      : trimmedName.slice(0, 2).toUpperCase();
    const colors = ['#3366FF', '#0056CC', '#1E293B', '#0F172A', '#4338CA'];
    const color = colors[(initials.charCodeAt(0) || 0) % colors.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" fill="${color}" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit, sans-serif" font-size="110" fill="#ffffff" font-weight="700">${initials}</text></svg>`;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  }

  static logout() {
    try {
      localStorage.removeItem(AUTH_KEY);
      return { success: true, message: 'Logged out successfully.' };
    } catch (error) {
      console.error('Unable to end the login session.', error);
      return { success: false, message: 'Logout failed.' };
    }
  }

  static getAllUsers() {
    return readArray(USERS_KEY);
  }

  static getUserRole() {
    return this.getCurrentUser()?.userType || null;
  }

  static updateUserStats(userId, stats) {
    const users = readArray(USERS_KEY);
    const index = users.findIndex((user) => user.id === userId);
    if (index < 0) return false;
    users[index] = { ...users[index], ...stats };

    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const currentUser = this.getCurrentUser();
      if (currentUser?.id === userId) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ ...currentUser, ...stats }));
      }
      return true;
    } catch (error) {
      console.error('Unable to update account statistics.', error);
      return false;
    }
  }
}
