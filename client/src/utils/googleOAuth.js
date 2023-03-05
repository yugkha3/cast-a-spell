export const googleOAuth = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: `${import.meta.env.VITE_BASE_URL_SERVER}/oauth/google`,
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    }

    const qs = new URLSearchParams(options)
    return `${rootUrl}?${qs.toString()}`
}