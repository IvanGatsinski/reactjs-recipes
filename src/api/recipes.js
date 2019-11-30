import { get, put, post, remove } from './utils'

export const fetchAllRecipes = () => {
    return get(`/appdata/kid_rJ7liiTuS/recipes?query={}&sort={"_kmd.ect": -1}`)
}
export const addRecipe = (payload) => {
    return post(`/appdata/kid_rJ7liiTuS/recipes`, payload, '')
}