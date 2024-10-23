
function colorizeItem(overall) {

    if (overall === undefined) {
        return '#f53c3d'
    } else if (overall <= 30) {
        return '#bf868f'
    } else if (overall > 30 && overall <= 50) {
        return '#a7c6cc'
    } else if (overall > 50 && overall <= 75) {
        return '#e6bc5c'
    } else if (overall > 75 && overall <= 85) {
        return '#5ee790'
    } else if (overall > 85 && overall <= 88) {
        return '#3ecbff'
    } else if (overall > 88) {
        return '#f53c3d'
    }
}

export default {
    colorizeItem
}