"use client";

import { Button, Modal, Carousel } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";
import { useUserContext } from "../contexts/UserContext";
import "../styles/Modal.scss";
import upvote from "../assets/icon_upvote.svg";
import upvoteFilled from "../assets/icon_upvote_filled.svg";
import downvote from "../assets/icon_downvote.svg";
import downvoteFilled from "../assets/icon_downvote_filled.svg";
import heart from "../assets/icon_heart.svg";
import heartFilled from "../assets/icon_heart_filled.svg";
import close from "../assets/x.svg";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);
  const { userFromDB, setUserFromDB } = useUserContext(); 

  const gemImage = () => {
    switch (props.gem.type) {
      case 'food':
        return <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" title="Ruby - Food" className="gem-currency-image" />;
      case 'entertainment':
        return <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" title="Sapphire - Entertainment" className="gem-currency-image" />;
      case 'outdoors':
        return <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" title="Emerald - Outdoor Activity" className="gem-currency-image" />;
      case 'shopping':
        return <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" title="Topaz - Shopping" className="gem-currency-image" />;
      case 'nightlife':
        return <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" title="Amethyst - Nightlife" className="gem-currency-image" />;
      case 'services':
        return <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" title="Citrine - Services" className="gem-currency-image" />;
    }
  };

  const upvoteGem = async (gemId) => {
    await fetch (`/api/votes/${gemId}/upvote`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    });
  }

  const downvoteGem = async (gemId) => {
    await fetch (`/api/votes/${gemId}/downvote`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    });
  }

  const favoriteGem = async (gemId) => {
    await fetch(`api/gems/favourite/${gemId}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    }).then(response => {if (response.status === 200) {
      const clone = {...userFromDB};
      
      // Only add to state if gem_id not already present
      if (!clone.favourited_gems.some(obj => obj.gem_id === gemId)) {clone.favourited_gems.push({gem_id: gemId});}
      setUserFromDB(clone);
    }})
  }


  return (
    <>
      <button className="modal-view-button" onClick={() => setOpenModal(true)}>View</button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>

      <div className="modal-button-close"> 
        <img src={close} onClick={() => setOpenModal(false)} alt="Close" />
      </div>

          <Modal.Body className="modal-container">
            <div className="modal-gem-img"> {gemImage()} </div>
            
            <div className="modal-info">
                <section className="details">
                  <span className="name"> 
                    {props.gem.name} 
                  </span>
                  <span className="description"> {props.gem.description} </span>
                </section>

                <div className="divider"></div>
                
                <section className="review">
                  <b>What's great about it? 
                  <i> {props.gem.created_by}</i> says:</b> <br/>
                  {props.gem.whats_great_about_it}
                </section>

                <section className="tags">
                  <div className="gem-tags">
                    {props.gem.tags.map((tag, index) => (
                      <span key={index} className="gem-tag">#{tag} </span>
                    ))} 
                  </div>
                </section>

                <section class="bottom">
                  <div className="modal-upvote">
                    <img src={upvote} onClick={() => upvoteGem(props.gem.gem_id)} alt="Upvote" className="top-img" />
                    <img src={upvoteFilled} className="bottom-img" />
                  </div>

                  <div className="modal-downvote">
                    <img src={downvote} onClick={() => downvoteGem(props.gem.gem_id)} alt="Downvote" className="top-img" />
                    <img src={downvoteFilled} onClick={() => downvoteGem(props.gem.gem_id)} alt="Downvote" className="bottom-img" />
                  </div>

                  <div className="modal-heart">
                    <img src={heart} onClick={() => favoriteGem(props.gem.gem_id)} alt="Add to favorites" className="top-img"/>
                    <img src={heartFilled} onClick={() => favoriteGem(props.gem.gem_id)} alt="Add to favorites" className="bottom-img"/>
                  </div>

                  {/* <img src={upvote} onClick={() => upvoteGem(props.gem.gem_id)} alt="Upvote" /> */}
                  {/* <img src={downvote} onClick={() => downvoteGem(props.gem.gem_id)} alt="Downvote" /> */}
                  {/* <img src={heart} onClick={() => favoriteGem(props.gem.gem_id)} alt="Add to favorites" /> */}
                </section>
            </div>

            <div className="modal-map">
              <MapContainer className="size-full" gems={[props.gem]}/>
            </div>
          </Modal.Body>
      </Modal>
    </>
  );
}