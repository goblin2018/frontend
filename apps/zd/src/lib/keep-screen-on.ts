export function keepScreenOn() {
    uni.setKeepScreenOn({
        keepScreenOn: true,
        fail: (err) => {
            uni.setKeepScreenOn({ keepScreenOn: true })
        },
    })
}