import User from "./User.js"
import BoardSection from "./BoardSection.js"
class Board {
    /**
     * @param {String} id
     * @param {String} name
     * @param {String} description
     * @param {BoardSection} sections
     * @param {User} owner
     * @param {User} users
    **/
    constructor(id, name, description, sections, owner, users){
        this.id = id
        this.name = name
        this.description = description?? ''
        this.sections = sections?? []
        this.owner = owner
        this.users = users?? []
    }

    /**
     * @param {JSON} data
     * @returns {Board}
     */
    static fromJSON(data) {
        return new Board(
            data.id,
            data.name,
            data.description,
            data.sections.map(section => {return BoardSection.fromJSON(section)}),
            User.fromJSON(data.owner),
            data.users.map(user => { return User.fromJSON(user) })
        )
    }
}

export default Board