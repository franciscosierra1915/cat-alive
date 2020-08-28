import React, { Component } from 'react';
import RecipeReviewCard from './RecipeReviewCard'

export default class CatList extends Component {

    render() {
        return(
            <div>
                {this.props.cats.map(cat => <RecipeReviewCard cat={cat} key={cat.id}/>)}
            </div>
        )
    }
}