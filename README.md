---
title: LilMartin-Music-vue
author: LilMartin
startdate: 2022-10-19
description: 个人搭建第三方网易云音乐播放器
---

## 项目初始化

### 技术选型

+ 开发环境及框架：vite+vue3+ts+scss
+ 工具库：axios、vue-router、pinia

### 基础功能实现

1. 登录：
   - [ ] 二维码登录
   - [ ] 手机验证码登录
   - [ ] 邮箱验证码登录
2. 搜索：
   - [ ] 歌名搜索
   - [ ] 歌单搜索
   - [ ] 歌手搜索
   - [ ] 专辑搜索
   - [ ] 歌词搜索
3. 展示（需加入上拉加载）：
   - [ ] 音乐列表展示
   - [ ] 专辑列表展示
   - [ ] 歌单列表展示
   - [ ] MV展示
4. 个人中心：
   - [ ] 收藏/喜欢歌单信息
   - [ ] 收藏MV
   - [ ] 收藏专辑

## 问题总结

### 网络请求

#### 生成二维码的unikey不刷新

在实现二维码刷新的时候，发现扫描的二维码只有一个，unikey无论怎么刷新都始终相同，找了半天才发现是因为生成unikey的接口读取了本地的缓存：

![image-20221024232238218](https://lilmartin.oss-cn-nanjing.aliyuncs.com/blog/image-20221024232238218.png)

如何让请求不读取本地缓存呢？我这里解决的办法是在请求参数中加入时间戳：

```js
//获取生成二维码的key
export const qrKey = () => {
    return request({
        url: `/login/qr/key?timestamp`,
        method: 'get',
        params: {
          timestamp: new Date().getTime(),
        },
    })
}
```

加入时间戳后，每条请求都会被浏览器看作是一个新的请求，就不会从本地读取缓存了：

![image-20221024232704819](https://lilmartin.oss-cn-nanjing.aliyuncs.com/blog/image-20221024232704819.png)
