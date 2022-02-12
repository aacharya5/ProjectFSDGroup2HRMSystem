import React, { Component } from 'react';

import '../Styles/Wallpaper.css';

export default class Wallpaper extends Component {
    getPropertiesFOrLocation = (e) => {
        
    }

    onSearchTextChange = (e) => {
        
    }
    render() {
        const { locationData } = this.props;
        return (
            <>
                <div className="topSection">
                    <img src={require('../Assets/home.jpg')} alt="home" className="homeImage" />
                    <div className="branding">
                        <div className="logo">
                            <img src={require('../Assets/logo.png')} alt="homelogo" className="homelogo" />
                        </div>
                        <div className="headerText">
                            <p class="subtitle letter-spacing-4 mb-2 text-shadow">The best living experience</p>
                            <h1 class="header">Stay like a local</h1>
                        </div>
                    </div>
                    <div className="searchOptions">
                        <span>
                            <select className="locationBox" onChange={this.getPropertiesFOrLocation}>
                                {
                                    locationData.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{ item.name }, {item.city} </option>
                                        )
                                    })
                                }
                            </select>
                        </span>
                        <span>
                            <input type="text" className="searchTextBox" placeholder="Search Properties" onChange={this.onSearchTextChange}/>
                        </span>
                    </div>
                        
                </div>
            </>
        )
    }
}
