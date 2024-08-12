import { ref } from "vue";
import { uuid } from "vue-uuid";
import User from "../models/User";
import store from "../store/store";

export const useUser = () => {

    const userReference = ref(null)
    const isLogged = ref(false)

    /**
     * @param {User} user
     * @param {Boolean} logged
     */
    function setUser(user, logged){
        if(!logged && !localStorage.getItem('user')){
            user = new User(
                uuid.v4(),
                `Uknow#${Math.round(Math.random()*1000)}`,
                'uknow@gmail.com',
                'https://avatar.iran.liara.run/public/2'
            )
            userReference.value = user
            return user
        }
        else if(!logged && localStorage.getItem('user')){
            const JSONuser = JSON.parse(localStorage.getItem('user'))
            user = User.fromJSON(JSONuser)
            userReference.value = user
            return user
        }
        
        userReference.value = user
        isLogged.value = logged
        return user
    }

    function saveUserState(){
        if(isLogged.value){
            store.user = userReference.value
            return userReference.value
        }
        localStorage.setItem('user', JSON.stringify(userReference.value))
        store.user = userReference.value
        return userReference.value
    }

    return {
        user: userReference,
        setUser,
        isLogged,
        saveUserState
    }
}