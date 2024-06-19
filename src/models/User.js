
class User {
    /**
 * @param {String} id
 * @param {String} name
 * @param {String} email
 * @param {String} avatar
 */
    constructor(id, name, email, avatar) {
        this.id = id
        this.name = name
        this.email = email
        this.avatar = avatar
    }

    /**
     * @param {JSON} data
     * @returns {User}
     */
    static fromJSON(data) {
        return new User(
            data.id,
            data.name,
            data.email,
            data.avatar
        )
    }
}

export default User