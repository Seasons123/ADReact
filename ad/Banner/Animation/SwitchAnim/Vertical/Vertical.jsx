import BannerAnim from '../../BannerAnim/BannerAnim';
import QueueAnim from '../../QueueAnim/QueueAnim';
import TweenOneAnim from '../../TweenOneAnim/index';

import React, { Component }  from 'react';

/*import '../../../css/banner.css';
import '../../../css/banner-anim.css';*/

import '../../../less/index.less';
import '../../../less/index.less';
import '../../../less/bgParallax.less';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class Vertical extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <BannerAnim type="across">
                    <Element key="aaa"
                             prefixCls="banner-user-elem"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                            }}
                            scrollParallax={{ y: 100 }}
                        />
                        <QueueAnim name="QueueAnim">
                            <h1 key="h1">Ant Motion Demo</h1>
                            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                        </QueueAnim>
                        <TweenOneAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
                            Ant Motion Demo.Ant Motion Demo
                        </TweenOneAnim>
                    </Element>
                    <Element key="bbb"
                             prefixCls="banner-user-elem"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                            }}
                            scrollParallax={{ y: 100 }}
                        />
                        <QueueAnim name="QueueAnim">
                            <h1 key="h1">Ant Motion Demo</h1>
                            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                        </QueueAnim>
                        <TweenOneAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
                            Ant Motion Demo.Ant Motion Demo
                        </TweenOneAnim>
                    </Element>
                </BannerAnim>
            </div>
        );
    }
}
