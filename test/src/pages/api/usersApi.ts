import axios from "axios"
import axiosClient from "./axiosClient"
import queryString from 'query-string'
import { user } from "../../types/user"

const usersApi ={
  async getAll({page, limit}: {page?: number, limit?:number}){
    let users: user[] | []
    const options = queryString.stringify({
      page,
      limit
    })

    users = await axiosClient.get('users', { params: options})

    return {
      data: users,
    }
  }
}

export default usersApi