import User from "./User.js"
import Activity from "./Activity.js"
class BoardSection {
    /**
     * @param {String} id
     * @param {String} title
     * @param {String} description
     * @param {User} owner
     * @param {Activity} activities
    **/
    constructor(id, title, description, owner, activities){
        this.id = id
        this.title = title
        this.description = description ?? ''
        this.owner = owner
        this.activities = activities?? []
    }
    /**
     * @param {JSON} data
     * @returns {BoardSection}
     */
    static fromJSON(data) {
        return new BoardSection(
            data.id,
            data.title,
            data.description,
            data.owner,
            data.activities.map(activity => { return Activity.fromJSON(activity) })
        )
    }
}

export default BoardSection