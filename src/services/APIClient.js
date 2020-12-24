const baseUrl = "http://localhost:8000/api/"


const APIClient = (function() {
    return {
        fetch : function(url, init) {
            let headers

            if (init) {
                if (init.headers) {
                    headers = init.headers
                } else {
                    headers = {}
                }
            } else {
                headers = {}
            }

            console.log(init)
            console.log(headers)

            if (this.AuthService.isLoggedIn()) {
                const token = this.AuthService.getToken()
                headers['Authorization'] = `Bearer ${token}`
            }

            return fetch(`${baseUrl}${url}`, { ...init, headers })
        },

        fetchChatEntries : async function() {
            return true
        },

        AuthService : (function() {
            function logOutCleanup() {
                window.localStorage.removeItem("auth")
                window.localStorage.removeItem("user_id")
                window.localStorage.removeItem("first_name")
                window.localStorage.removeItem("last_name")
            }

            return {
                getPersonalData: function() {
                    let id = window.localStorage.getItem("user_id")
                    let first_name = window.localStorage.getItem("first_name")
                    let last_name = window.localStorage.getItem("last_name")
                    return { id, first_name, last_name }
                },

                getUserId: function() {
                    return window.localStorage.getItem("user_id")
                },

                setToken: function(token) {
                    window.localStorage.setItem("auth", token)
                },

                getToken : function() {
                    return window.localStorage.getItem("auth")
                },

                tokenExists : function() {
                    const tokenProbe = this.getToken()
                    return !(tokenProbe === null || tokenProbe === undefined)
                },

                isLoggedIn : function() {
                    return this.tokenExists()
                },
        
                logIn : async function(username, password) {
                    try {
                        const http_response = await APIClient.fetch("token/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "Application/json",
                            },
                            body: JSON.stringify({ username, password })
                        })

                        if (http_response.ok !== true) {
                            throw "Couldn't log in with given credentials"
                        }

                        const json_response = await http_response.json()

                        const { access } = json_response
                        APIClient.AuthService.setToken(access)

                        const personal_http = await APIClient.fetch("personal/")

                        if (personal_http.ok !== true) {
                            throw "Something went wrong while retrieving personal data..."
                        }

                        const [personal_data] = await personal_http.json()

                        window.localStorage.setItem("user_id", personal_data.id)
                        window.localStorage.setItem("first_name", personal_data.first_name)
                        window.localStorage.setItem("last_name", personal_data.last_name)

                        console.log("Auth success!")
                        console.log("token: ", APIClient.AuthService.getToken())
                        console.log("Personal data: ", personal_data)

                    } catch(error) {
                        console.error("[LogIn FAILED], ", error)
                        return false
                    }
                    
                    return true

                    // let success = true

                    // let feed_promise = APIClient.fetch("token/", {
                    //     method: "POST",
                    //     headers: {
                    //         "Content-Type": "Application/json",
                    //     },
                    //     body: JSON.stringify({ username, password })
                    // }).catch((error) => {
                    //     console.error("[LogIn FAILED], ", error)
                    //     success = false
                    // }).then(
                    //     response => response.json()
                    // ).then((json_response) => {
                    //     console.error("Parse nevetheless")
                    //     const { access } = json_response
                    //     APIClient.AuthService.setToken(access)

                    //     console.log("Auth success!")
                    //     console.log("token: ", APIClient.AuthService.getToken())
                    //     return true
                    // })

                    // return Promise.all([feed_promise])
                },
        
                logOut : function() {
                    logOutCleanup()
                }
            }
        })()
    }
})()

export default APIClient