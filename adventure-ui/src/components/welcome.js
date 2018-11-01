import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    constructor() {
        super();
        }

        render() {
            return (

                <div>
                    <h2>
                        Enter if you dare
                    </h2>
                    <p>
                        Please select an option
                    </p>
                    <Link to ={`/login`}>
                    <button>
                        Login
                    </button>
                    </Link>
                    <Link to ={`/register`}>
                    <button>
                        Register
                    </button>
                    </Link>
                </div>
            )}      
    }

export default Welcome;