import React, { Component } from 'react';
import QuickSearch from './QuickSearch';
import '../Styles/QuickSearches.css';

export default class QuickSearches extends Component {
    render() {
        const { qsData } = this.props;
        return (
            <>
                <div className="bottomSection">
                    <h3> Discover your life!! </h3>
                    <div className="container qs-boxes-container">
                        {/* {
                            qsData.map((item, index) => {

                            })
                        } */}
                        <QuickSearch />
                    </div>
                </div>
            </>
        )
    }
}
