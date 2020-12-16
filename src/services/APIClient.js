const baseUrl = "http://localhost:8000/api/"

const APIClient = (function() {
    return {
        fetch : function(url, init) {
            return fetch(`${baseUrl}${url}`, init)
        }
    }
})()

export default APIClient