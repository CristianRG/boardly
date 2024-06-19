import User from "./User.js"
import Comment from "./Comment.js"
class Activity {
    /**
     * @param {String} id
     * @param {String} title
     * @param {String} content
     * @param {User} owner
     * @param {Comment} comments
    */ 
    constructor(id, title, content, owner, comments){
        this.id = id
        this.title = title
        this.content = content?? ''
        this.owner = owner
        this.comments = comments?? []
    }
    /**
     * @param {JSON} data
     * @returns {Activity}
     */
    static fromJSON(data) {
        return new Activity(
            data.id,
            data.title,
            data.content,
            data.owner,
            data.comments.map(comment => {return Comment.fromJSON(comment)})
        )
    }
}

export default Activity