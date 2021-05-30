import { GetterTree } from 'vuex'
import { asyncRouterMap } from '../router/index'
const getters:GetterTree<any,any> = {
    user(state:any):any{
        return state.user
    },
    routers(state:any):any{
        return state.routers
    }
}
export default getters