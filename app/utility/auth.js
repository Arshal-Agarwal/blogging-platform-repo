// utils/auth.js

export function isAuthenticated() {
    // Check if the access token exists in localStorage
    const token = localStorage.getItem('accessToken');
    return !!token;
}
