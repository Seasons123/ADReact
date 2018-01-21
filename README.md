一、命令

npm install
//安装依赖

webpack
//打包

npm run server
// 开发环境运行


二、node服务器端应用了web框架是Express，服务器程序是devServer.js


三、关于鼠标放上若是自动轮播的话暂停移开继续，也可以这样写，都行

    onMouseOver = () => {
          if(this.props.pause && this.props.autoPlay ) {
            ticker.clear(this.autoPlayId);
          }
      }

    onMouseOut = () => {
     if(this.props.pause && this.props.autoPlay ) {
        this.autoPlay();
     }
  }




