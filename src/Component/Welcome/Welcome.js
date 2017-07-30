import React, { Component } from 'react';
import smoothScroll from 'smoothscroll';
import './Welcome.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.getImage(),
            bodyWidth: document.body.clientWidth
        };

        this.getImage = this.getImage.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                bodyWidth: document.body.clientWidth,
                image: this.getImage()
            });
        }, false);
    }

    getImage() {
        const bodyWidth = document.body.clientWidth;
        var url = bodyWidth > 768 ? 'background_h.jpg' : 'background_v.jpg';
        return process.env.PUBLIC_URL + '/img/' + url;
    }

    scrollTo() {
        console.log('hello');
        var to = document.querySelector(this.props.scrollTo);
        smoothScroll(to);
    }

    render() {
        const { image } = this.state;
        var style = {
            backgroundImage: 'url(' + image + ')'
        }

        return (
            <div className="welcome" style={style} onClick={this.scrollTo}>
                <div className="intro-body">
                    <section><span id="arrow-0"></span></section>
                    <section><span id="arrow-1"></span></section>
                </div>
            </div>
        );
    }
}

export default Welcome;