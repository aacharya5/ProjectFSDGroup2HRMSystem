import React from 'react';


export default function QuickSearch() {
    return (
        <div className="qs-box">
            <div id="container">
                <div className="qs-box-contents" >
                    <img src={require("../Assets/onebhk.jpg")} alt="type" />
                    <h4>1BHK</h4>
                    <p>You can owe more than 800sqft area</p>
                </div>
                <div className="qs-box-contents" >
                    <img src={require("../Assets/twobhk.jpg")} alt="type" />
                    <h4>2BHK</h4>
                    <p>You can owe more than 1200sqft area</p>
                </div>
                <div className="qs-box-contents" >
                    <img src={require("../Assets/threebhk.jpg")} alt="type" />
                    <h4>3BHK</h4>
                    <p>You can owe more than 2000sqft area</p>
                </div>
            </div>
        </div>
    )
}
