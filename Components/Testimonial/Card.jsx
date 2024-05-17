import { BASE_URL } from '@/APiSetUp/axios'
import React from 'react'

const Card = ({data,image_path}) => {
    return (
        <div className='testimonial-card'>
            <div className="content">
                <img src="/images/backtik.webp" alt="" />
                <h1>{data?.caption}</h1>
                <p>“{data?.description}”</p>
            </div>
            <div className="user-main">
                <img src="/images/testmonial-border.webp" className='user-border' alt="" />
                <div className="user">
                    <img src={data?.image ? BASE_URL + image_path + "/" + data?.image : "/images/default.webp"} alt="" />
                    <div className="user-content">
                        <div className="name">{data?.user_name}</div>
                        <div className="location">{data?.location}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card