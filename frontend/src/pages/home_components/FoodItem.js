import React from 'react';

class FoodItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: ""
        };
    }

    render () {
        return (
            <div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: 'space-between'}}>
                    <h1>{this.props.item.meal_name}</h1>
                    <h1>{this.props.item.calories}</h1>
                </div>
                <p>{this.props.item.ingr}</p>
            </div>
            );
    }
}

export default FoodItem;