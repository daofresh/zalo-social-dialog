# zalo-social-dialog


## Install
```
npm i -S zalo-social-dialog
```

## Usage

```js
import ZaloSocialDialog from 'zalo-social-dialog'

let zalo = new ZaloSocialDialog({
    app_id: 'YOUR_ZALO_APP_ID',
    redirect_uri: '',
    state: ''
})

zalo.login()
    .then(params => {
        // Success
        console.log(params.code)
    })
    .catch(() => {
        // Error
        console.log('Cancelled')
    })
```
