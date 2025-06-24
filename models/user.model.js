class User {
    constructor(email, password, name = null) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

module.exports = User;