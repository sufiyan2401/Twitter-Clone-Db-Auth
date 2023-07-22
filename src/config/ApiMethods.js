import React from 'react'
import axios from 'axios'

let apiHandle = axios.create({
    baseURL: 'https://fair-plum-starfish-shoe.cyclic.app/api/'
    // baseURL:'https://jsonplaceholder.typicode.com/'
})
let Get = (endPoint) => {
    return apiHandle.get(endPoint);
}
let GetById = (endPoint, id) => {
    return apiHandle.get(`${endPoint}/${id}`)
}
let Post = (endPoint, body) => {
    console.log('body',body)
    return apiHandle.post(endPoint, body)
}
let Put = (endPoint, id, body) => {
    return apiHandle.put(`${endPoint}/${id}`, body)
}
let Delete = (endPoint, id) => {
    return apiHandle.delete(`${endPoint}/${id}`)
}
export { Get, Post, GetById, Put, Delete };
