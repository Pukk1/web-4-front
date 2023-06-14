export const API_BASE_URL = 'http://localhost:8080'

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/login/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const VK_AUTH_URL = API_BASE_URL + '/login/oauth2/authorize/vk?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const AUTH_PAGE_URI = "/"
export const MAIN_PAGE_URI = "/main"