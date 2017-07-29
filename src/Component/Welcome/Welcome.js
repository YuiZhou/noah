import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.getImage(),
            bodyWidth: document.body.clientWidth
        };

        this.getImage = this.getImage.bind(this);
    }
    
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                bodyWidth: document.body.clientWidth
            });
        }, false);
    }

    getImage() {
        const bodyWidth = document.body.clientWidth;
        var url = bodyWidth > 768 ? 'background_v.jpg' : 'background_h.jpg';
        return process.env.PUBLIC_URL + '/img/' + url;
    }


    render() {
        const { image } = this.state;
        console.log(image);
        var style = {
            backgroundImage: 'url(' + image + ')'
        }

        return (
            <div className="welcome" style={style} >
                <a href={this.props.scrollTo}><div className="intro-body">
                    <section><span id="arrow-0"></span></section>
                    <section><span id="arrow-1"></span></section>
                </div>
                </a>
            </div>
        );
    }
}

export default Welcome;