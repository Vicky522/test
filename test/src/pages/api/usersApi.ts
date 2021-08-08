import axios from "axios"
import axiosClient from "./axiosClient"
import queryString from 'query-string'
import { user } from "../../types/user"

const usersApi ={
  async getAll({page, limit}: {page?: number, limit?:number}){
    let users: user[] = []
    let usersWithOptions: user[] = []
    const options = {
      page,
      limit
    }

    usersWithOptions = await axiosClient.get('users?sortBy=createdAt&order=desc', { params: options})
    users = await axiosClient.get('users?sortBy=createdAt&order=desc')
    const totalUsers = users.length

    return {
      data: usersWithOptions,
      totalUsers: users ? totalUsers : 0
    }
  },

  async createUser(user:user){
    return await axiosClient.post('users', user)
  }
}

export default usersApi