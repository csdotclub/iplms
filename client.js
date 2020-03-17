// When including this on your page, make sure to include a copy of FingerprintJS2.
// If you want to bypass AdBlock or uBlock, host a minified version of FingerprintJS2 on your domain.
// Make *sure* you include it before you include this script.

const config = {
  IPLMS_HOST: 'http://localhost:3000' // Change this to where you are hosting IPLMS.
}

async function postFPData(components) {
  try {
    const data = await fetch(config.IPLMS_HOST, {
      method: 'POST',
      body: JSON.stringify(components),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.text())

    return data
  } catch (error) {
    throw new Error('Posting FP data failed: ' + error)
  }
}

window.addEventListener('load', async () => {
  try {
    if (window.requestIdleCallback) {
      requestIdleCallback(async function () {
        await Fingerprint2.get(async function (components) {
          const res = await postFPData(components)

          if (res === 'OK') {
            return console.log("Done")
          } else return console.error("Failed")
        })
      })
    } else {
      setTimeout(async function () {
        Fingerprint2.get(async function (components) {
          const res = await postFPData(components)

          if (res === 'OK') {
            return console.log("Done")
          } else return console.error("Failed")
        })
      }, 500)
    }
  } catch (error) {
    console.log("Async load event failed")
  }
})