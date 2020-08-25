import React, { Component } from 'react';
import CatCard from './CatCard'

export default class CatList extends Component {

    render() {
        return(
            <div>
                {this.props.cats ? this.props.cats.map(cat => <CatCard cat={cat} key={cat.id}/>) : null}
            </div>
        )
    }
}