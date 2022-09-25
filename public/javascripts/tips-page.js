document.addEventListener("DOMContentLoaded", function(e) { 
    let authDiv = document.getElementById('auth')
    let paymentDiv = document.getElementById('payment')
    let phoneContinueBtn = document.getElementById('phone-continue-btn')
    let phoneContinueInput = document.getElementById('phone-continue-input')
    let paymentAmountInput = document.getElementById('payment-amount-input')
    let paymentButton = document.getElementById('payment-button')

    authDiv.hidden = false
    paymentDiv.hidden = true

    // fetch('https://api.yii2-stage.test.wooppay.com/v1/auth/pseudo', {
    //     method: 'OPTIONS',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Credentials': 'true',
    //             'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    //             'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Language, Time-Zone, Partner-name, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers',
    //     }
    // })

    phoneContinueBtn.onclick = () => {
        fetch('https://api.yii2-stage.test.wooppay.com/v1/auth/pseudo', {
            method: 'POST',
            headers: {
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
                // 'Language': 'ru',
                // 'Time-Zone': 'Asia/Almaty',
                // 'Partner-name': 'tips'
            },
            body: JSON.stringify({
                login: phoneContinueInput.value
            })
        })
            .then((r) => r.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('wp-tip-token', data["token"])
                authDiv.hidden = true
                paymentDiv.hidden = false
            })
            .catch((e) => console.log('Some error happens...'));
    }

    paymentButton.onclick = () => {
        fetch('https://api.yii2-stage.test.wooppay.com/v1/payment/transfer-new', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('wp-tip-token'),
                'Content-Type': 'application/json',
                // 'Language': 'ru',
                // 'Time-Zone': 'Asia/Almaty',
                // 'Partner-name': 'tips'
            },
            body: JSON.stringify({
                'service_name': 'transfer_77754213125_1663955543',
                fields: {
                    amount: parseInt(paymentAmountInput.value)
                }
            })
        })
            .then((r) => r.json())
            .then((data) => {
                console.log(data)
                


                fetch('https://api.yii2-stage.test.wooppay.com/v1/payment/pay-from-card', {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('wp-tip-token'),
                        'Content-Type': 'application/json',
                        // 'Language': 'ru',
                        // 'Time-Zone': 'Asia/Almaty',
                        // 'Partner-name': 'tips'
                    },
                    body: JSON.stringify({
                        'operation_id': data["operation"]["id"],
                    })
                })
                    .then((r) => r.json())
                    .then((data) => {
                        console.log(data)
                        
                        this.location.assign(data["frame_url"])

                    })
                    .catch((e) => console.log('Some error happens...'));
                


            })
            .catch((e) => console.log('Some error happens...'));
    }
});