import React, { Component } from 'react';
import AutoResponsive from 'autoresponsive-react';
import { PhotoSwipe } from 'react-photoswipe';
import './Display.css';
import 'react-photoswipe/lib/photoswipe.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyWidth: this.getBodyWidth(),
            imageWidth: this.getImageWidth(),
            itemMargin: 15,
            isOpen: false,
            options: {
                closeOnScroll: false
            }
        }
        this.handleClose = this.handleClose.bind(this);
        this.openSwipe = this.openSwipe.bind(this);
        this.getBodyWidth = this.getBodyWidth.bind(this);
        this.getImageWidth = this.getImageWidth.bind(this);
        this.getClientWidth = this.getClientWidth.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle() {
        return {
            width: this.getClientWidth()
        }
    }

    getBodyWidth() {
        return document.body.clientWidth;
    }

    getImageWidth() {
        var bodyWidth = this.getBodyWidth();
        if (bodyWidth > 768 || bodyWidth < 360) {
            return 240;
        }

        return 165;
    }

    getClientWidth() {
        const { bodyWidth, imageWidth, itemMargin } = this.state;
        var itemWidth = imageWidth + itemMargin;
        var containerWidth = bodyWidth > 768 ? bodyWidth * 0.9 : bodyWidth;
        return Math.floor(containerWidth / itemWidth) * itemWidth - itemMargin + 1;
    }

    getAutoResponsiveProps() {
        return {
            itemMargin: this.state.itemMargin,
            containerWidth: this.getClientWidth(),
            itemClassName: 'item',
            gridWidth: 15,
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
        console.log(index);
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
        const { imageWidth, isOpen, options } = this.state;
        return (
            <div className="display" style={this.getStyle()}>
            <AutoResponsive ref="container" {...this.getAutoResponsiveProps() }>
                {
                    images.map(function (x, i) {
                        var itemStyle = {
                            width: imageWidth,
                            height: imageWidth * x.h / x.w
                        }
                        return <div className="item" style={itemStyle} key={i}><img src={ x.thumb } alt={x.discribe} onClick={this.openSwipe.bind(this, i)}/></div>;
                    }, this)
                }
            </AutoResponsive>
            <PhotoSwipe isOpen={isOpen} items={images} options={options} onClose={this.handleClose}/>
            </div>
        );
    }
}

export default Display;
