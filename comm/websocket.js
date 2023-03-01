// 创建 websocket.js文件
export default class WebsocketTask{
  constructor(url,time){
     this.url = url
     this.data = null
     this.isOpenSocket = false
     // 心跳检测
     this.timeout = time
     this.heartbeat = null
 
     try{
       return this.connectSocketInit()
     }catch(e){
       this.isOpenSocket = false
       this.reconnect();
     } 
  }

  connectSocketInit(){
    this.socketTask = uni.connectSocket({
      url: this.url
    })

    this.socketTask.onOpen((res)=>{
      clearTimeout(this.heartbeat);
      this.isOpenSocket = true
      this.start();
      this.socketTask.onMessage((res)=>{
         //接收消息
      })
    })

    this.socketTask.onClose(()=>{
      this.isOpenSocket = false;
      this.reconnect();
    })
  }

  //发送消息
  send(data){
    this.socketTask.send({
       data,
    })
  }
  //开启心跳检测
  start(){
    this.heartbeat = setTimeout(()=>{
       this.data = {value:'xx'}
       this.send(JSON.stringify(this.data));
    }, timeout)
  }
  // 重新连接
  reconnect(){
   clearInterval(this.heartbeat)
   if(!this.isOpenSocket){
     setTimeout(()=>{
        this.connectSocketInit();
     }, 3000)
   }
  }
}