const TOKEN_KEY = 'cs2analyzer.token';

// localStorage bloklanıbsa (məxfi rejim və s.) tətbiq çökməsin deyə hər çağırış qorunur.
export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.warn('Token oxuna bilmədi:', error);
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.warn('Token yazıla bilmədi:', error);
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.warn('Token silinə bilmədi:', error);
  }
}