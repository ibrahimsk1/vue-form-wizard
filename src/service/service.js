export let paymentControl = function() {
    return new Promise(function (resolve, reject) {
        try {
            setTimeout(function () {
                resolve(true)
            }, 3000);
        } catch (err) {
            reject(err);
        }
    })
}