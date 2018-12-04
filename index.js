const queryString = require('query-string')
const OauthUrl = 'https://oauth.zaloapp.com/v3/auth'

class ZaloSocialDialog
{
    constructor({app_id, redirect_uri, state}) {
        this.app_id = app_id
        this.redirect_uri = redirect_uri
        this.state = state
    }

    login() {
        let width = 600
        let height = 700
        let left = parseInt((window.outerWidth - width) / 2)
        let top = parseInt((window.outerHeight - height) / 2)
        let url = OauthUrl + '?app_id=' + this.app_id
            + '&redirect_uri=' + encodeURIComponent(this.redirect_uri)
            + '&state=' + this.state

        return new Promise((resolve, reject) => {
            let zalowindow = window.open(url, 'zalo-social', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left)
            let zalointerval = setInterval(() => {
                if (zalowindow.closed) {
                    clearInterval(zalointerval)
                    reject()
                } else {
                    const parsed = queryString.parse(zalowindow.location.search)
                    if (parsed.code && parsed.state == this.state) {
                        clearInterval(zalointerval)
                        resolve(parsed)
                        zalowindow.close()
                    }
                }
            }, 1000)
        })
    }
}

export default ZaloSocialDialog