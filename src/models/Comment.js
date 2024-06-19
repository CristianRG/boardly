import User from "./User.js"

class Comment {
    /**
     * @param {String} id
     * @param {String} content
     * @param {User} owner
     */
    constructor(id, content, owner) {
        this.id = id
        this.content = content
        this.owner = owner
    }
    /**
     * @param {JSON} data
     * @returns {Comment}
     */
    static fromJSON(data) {
        return new Comment(
            data.id,
            data.content,
            data.owner
        )
    }
}

export default Comment