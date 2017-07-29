import React, { Component } from 'react';
import AutoResponsive from 'autoresponsive-react';
import { PhotoSwipe } from 'react-photoswipe';
import './Display.css';
import 'react-photoswipe/lib/photoswipe.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyWidth: document.body.clientWidth,
            isOpen: false,
            options: {
                closeOnScroll: false
            }
        }
        this.handleClose = this.handleClose.bind(this);
        this.openSwipe = this.openSwipe.bind(this);
    }

    getAutoResponsiveProps() {
        const { bodyWidth } = this.state;
        var clientWidth = bodyWidth > 768 ? bodyWidth * 0.9 : bodyWidth - 20;
        return {
            itemMargin: 15,
            containerWidth: clientWidth,
            itemClassName: 'item',
            gridWidth: 10,
            transitionDuration: '.8',
            transitionTimingFunction: 'easeIn'
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                bodyWidth: document.body.clientWidth
            });
        }, false);
    }

    handleClose() {
        this.setState(function() {
            return { isOpen: false };
        });
    }

    openSwipe(index) {
        this.setState(function() {
            return {
                isOpen: true,
                options: {
                    index: index,
                    closeOnScroll: false,
                    clickToCloseNonZoomable: false
                }
            }
        });
    }

    render() {
        const { images } = this.props;
        const { isOpen, options } = this.state;
        const fixWidth = 235;
        return (
            <div>
            <AutoResponsive ref="container" {...this.getAutoResponsiveProps() }>
                {
                    images.map(function (x, i) {
                        var itemStyle = {
                            width: fixWidth,
                            height: fixWidth * x.h / x.w
                        }
                        return <div className="item" style={itemStyle} key={i}><img src={ x.thumb} alt={x.discribe} onClick={this.openSwipe.bind(i)}/></div>;
                    }, this)
                }
            </AutoResponsive>
            <PhotoSwipe isOpen={isOpen} items={images} options={options} onClose={this.handleClose}/>
            </div>
        );
    }
}

export default Display;