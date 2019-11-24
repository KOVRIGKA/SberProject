import React, { Component } from 'react';
import StripeChechkout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component{
    render(){
        return (
            <StripeChechkout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500} //5 долларов или 500 центов
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeChechkout>
        );
    }
}

export default connect(null, actions )(Payments);