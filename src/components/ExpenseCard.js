import React from "react";
import "./ExpenseTracker.css";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";

export default function ExpenseCard({details, handleDelete, handleEdit}) {

    return(
        <div className = "txn-card-Wrapper">

            <div className="cardInner">
                <div className="cardIcon">
                    {details.category == 'food' && <PiPizza />}
                    {details.category == 'entertainment' && <PiGift />}
                    {details.category == 'travel' && <BsSuitcase2 />}
                </div>
                <div className="cardInfo">
                    <h5>{details.title}</h5>
                    <p>{details.date}</p>
                </div>
            </div>

            <div className="cardInner">
                <p className="cardPrice">₹{details.price}</p>
                <div className="cardButtonWrapper">
                    <button className="cardDelete" onClick={handleDelete}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className="cardEdit" onClick={handleEdit}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>
        </div>
    )
}

