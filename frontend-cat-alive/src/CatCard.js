import React, { Component } from 'react';
import './App.css';


export default class CatCard extends Component {

    render() {
        const cat = this.props.cat
        return(
        <div>
            <h1 className='cat-name'>{cat.name}</h1>
            <p className='cat-age'>{cat.age}</p>
            <h3 className='cat-gender'>{cat.gender}</h3>
            {cat.photos.map(photo => <img key={photo.id} alt='cat-photos' className='photo' src={photo.full}></img>)}
        </div>
        )
    }
    
}