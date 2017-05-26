import  { TweenOneGroup } from 'rc-tween-one';
import { Input, Button, InputNumber, Radio, Icon } from 'antd';
import '../../css/logoGather.css';

export default class  Edit extends React.Component {
    constructor(props) {
        super(props);
        this.defaultImage = {
            a: 'http://localhost:3000/images/SD.svg',
            b: 'http://localhost:3000/images/demo.svg',
            c: 'http://localhost:3000/images/reactLogo.svg',
        };
        this.state = {
            image: this.defaultImage.a,
            pixSize: 20,
            pointSize: 10,
            isMode: false,
            show: false,
        };
    }

    componentDidMount() {
        this.enquireScreen((isMode) => {
            this.setState({ isMode });
        });
    }

    enquireScreen = (cb) => {
        /* eslint-disable no-unused-expressions */
        enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
            match: () => {
                cb && cb(true);
            },
            unmatch: () => {
                cb && cb();
            },
        });
        /* eslint-enable no-unused-expressions */
    }

    onChangeImage = (e) => {
        const dom = e.target;
        this.image = dom.value;
    }

    onChangePix = (num) => {
        this.pixSize = num;
    }

    onClick = () => {
        if (this.image || this.pixSize || this.pointSize) {
            this.setState({
                image: this.image || this.state.image,
                pixSize: typeof this.pixSize === 'number' ? this.pixSize : this.state.pixSize,
                pointSize: typeof this.pointSize === 'number' ? this.pointSize : this.state.pointSize,
                update: true,
            }, () => {
                this.setState({
                    update: false,
                });
            });
        }
    }

    onChangeRadio = (e) => {
        const target = e.target;
        const value = target.value;
        this.image = this.defaultImage[value];
        this.setState({
            value,
        });
    }

    onChangePoint = (num) => {
        this.pointSize = num;
    }

    phoneClick = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    render() {
        return (<div style={{ position: 'relative' }}>
            {!this.state.update && <LogoGather
                image={this.state.image}
                pixSize={this.state.pixSize}
                pointSizeMin={this.state.pointSize}
            />}
            <div className={`logo-gather-demo-edit-wrapper ${this.state.show ? 'open' : ''}`}>
                {this.state.isMode && (<div className="edit-button" onClick={this.phoneClick}>
                    <Icon type="down"/>
                </div>)}
                <ul>
                    <li>图片:</li>
                    <li >
                        <RadioGroup onChange={this.onChangeRadio} defaultValue="a">
                            <Radio value="a">
                                <img
                                    src={this.defaultImage.a}
                                    height="30"
                                />
                            </Radio>
                            <Radio value="b">
                                <img
                                    src={this.defaultImage.b}
                                    height="30"
                                />
                            </Radio>
                            <Radio value="c">
                                <img
                                    src={this.defaultImage.c}
                                    height="30"
                                />
                            </Radio>
                            <Radio key="d" value="d" className={`${this.state.isMode ? 'none' : ''}`}>
                                其它
                                <TweenOneGroup
                                    style={{ display: 'inline-block', height: 0 }}
                                    enter={{ width: 0, opacity: 0, type: 'from' }}
                                    leave={{ width: 0, opacity: 0 }}
                                >
                                    {this.state.value === 'd' ?
                                        (<div key="d">
                                            <Input
                                                placeholder="或自行输入"
                                                style={{ width: 120, marginLeft: 5 }}
                                                onChange={this.onChangeImage}
                                            />
                                        </div>) : null}
                                </TweenOneGroup>
                            </Radio>
                        </RadioGroup>
                    </li>
                    <li className={`${this.state.isMode ? 'phone-float-none' : ''}`}>图片取点像素：</li>
                    <li>
                        <InputNumber
                            defaultValue={this.state.pixSize}
                            min={15}
                            style={{ width: 60 }}
                            onChange={this.onChangePix}
                        />
                    </li>
                    <li className={`${this.state.isMode ? 'phone-float-none' : ''}`}>点的宽加随机：</li>
                    <li>
                        <InputNumber
                            defaultValue={this.state.pointSize}
                            style={{ width: 60 }}
                            onChange={this.onChangePoint}
                        />
                    </li>
                    <li className={`${this.state.isMode ? 'phone-float-none' : ''}`}>
                        <Button type="primary" onClick={this.onClick}>更新</Button>
                    </li>
                </ul>
                <div style={{ lineHeight: '32px' }}>
                    注：图片尺寸为正方形的PNG或SVG，请确保图片开启跨域；像数点的数值越大则点越少，为流畅最小值为15
                </div>
            </div>
        </div>);
    }
}