function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function generateUserData() {
    return {
        cash: getRandomInt(1000, 5000)
    }
}

function generateProductData() {
    return {
        rating: getRandomInt(0, 5)
    }
}

module.exports = {
    generateUserData,
    generateProductData
}
