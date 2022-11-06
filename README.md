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
   - [x] 二维码登录
   - [ ] 手机验证码登录
   - [ ] 邮箱验证码登录
2. 搜索：
   - [x] 歌名搜索
   - [x] 歌单搜索
   - [x] 歌手搜索
   - [x] 专辑搜索
   - [ ] 歌词搜索
3. 展示（需加入上拉加载）：
   - [x] 音乐列表展示
   - [ ] 专辑列表展示
   - [x] 歌单列表展示
   - [ ] MV展示
4. 个人中心：
   - [x] 收藏/喜欢歌单信息
   - [ ] 收藏MV
   - [ ] 收藏专辑

## 开发记录

### 二维码登录业务实现

#### 1. 二维码的生成

依赖库 qrcode：`npm i qrcode`

```typescript
export async function generatorQrCode(unikey: string, option: QROption): Promise<string> {
    try {
        console.log(unikey)
        //从网易官方获取二维码，然后根据配置项生成base64格式的二维码
        const svg = await QRCode.toString(
            `https://music.163.com/login?codekey=${unikey}`,
            option
        );
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    } catch (e) {
        console.error(e);
        return 'error';
    }
};
```

#### 2. 二维码被扫描状态的监测

通过 `setInterval` 轮询请求 “获取二维码状态” 的接口，根据不同的响应编码做出不同的反应：

1. 800：二维码失效，重新生成二维码
2. 801：等待扫描
3. 802：已扫描，等待确认登录
4. 803：登录成功，跳转到主界面，并清除 Interval 计时器。

```typescript
function checkQrStatus() {
  if (interval != null) clearInterval(interval);
  interval = setInterval(async () => {
    if (qrCode.value === "") return;
    const res = await checkQrKey(qrCode.value!);
    const { code, cookie } = res;
    if (code === 800) {
      refreshQrCode();
    }
    qrCodeDesc.value =
      code === 801
        ? CODEMESSAGE.CODEMSG_801
        : code === 802
        ? CODEMESSAGE.CODEMSG_802
        : CODEMESSAGE.CODEMSG_803;
    if(code === 803){
      clearInterval(interval);
      userStore.userLogin(cookie)
    }
  }, 1000);
}
```

#### 3. 登录成功保存cookie状态

依赖库 `js-cookie`：`npm i js-cookie -D`

需要在 `src/type/js-cookie.d.ts` 文件下声明：

```typescript
declare module "js-cookie" {
    import * as Cookies from 'js-cookie'
    export default Cookies
}
```

封装Cookie相关操作的Utils文件：

> 扫码成功后返回的cookie字段需要做一些处理，处理方法看代码：

```typescript
import Cookies from 'js-cookie'

//设置cookie、Localstorage
export function setCookies(cookieString: string) {
    const cookies = cookieString.split("; HTTPOnly;");
    cookies.forEach(cookie => {
        document.cookie = cookie;
        const cookieKeyValue = cookie.split(";")[0].split("=");
        localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
    })
}
//获取Cookie或LocalStorage
export function getCookie(key: string) {
    return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}
//移除Cookie或LocalStorage
export function removeCookie(key: string) {
    Cookies.remove(key);
    localStorage.removeItem(`cookie-${key}`)
}
```

### 搜索功能实现

搜索的话会涉及到分页，考虑了很多种方法：

1. 在pinia中存储一个分页的状态，但是因为不同页面可能分页的搜索不一样所以pass。
2. 定义一个分页的 `type` 或 `interface` ，然后在需要搜索的页面去实现，然后传入api方法中即可。

```typescript
type searchPage = {
  limit: number;
  offset: number;
  keywords: string;
}
```

#### 列表中的"加载更多"的实现

该功能的实现需要做如下几步：

1. 获取下一页的歌曲列表
2. 将获取的下一页的歌曲列表push到list中

实现：

```javascript
async function searchMusic() {
  try {
    const res: any = await searchByKeyWords({
      ...searchPage,
    });
    const type: SearchType = tabComponents[curSelect.value].id;
    Array.prototype.push.apply(list, lists.songs);
  } catch (e) {
    console.error(e);
  }
}
```



## 问题总结

### 异常解决

#### vue3-ts开发时依赖包爆红

![image-20221027213433452](https://lilmartin.oss-cn-nanjing.aliyuncs.com/blog/image-20221027213433452.png)

遇到这种情况，一般是开发这个包的团队或个人没有做ts的适配，也就是在 `*.d.ts` 中声明该依赖包，此时我们需要去手动添加一个声明文件，那么我需要在src目录下先创建一个type，然后创建一个声明该依赖的ts文件，该文件以 `.d.ts` 结尾，例如这里我使用qrcode，那么我们创建的声明文件就应该叫做：`qrcode.d.ts`，文件内配置如下：

```typescript
declare module "qrcode" {
    import QRCode from 'qrcode'
    export default QRCode
}
```

其他依赖报红时，解决方案同理。

### 网络请求

#### 请求拦截器封装默认参数

在本项目中，每个请求的params中其实都需要带上时间戳，还有部分请求需要带上cookie，那么在每个请求的api中都写上这两个参数就有些冗余了，封装到请求拦截器中会提高一点点开发效率：

```ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getCookie } from './auth'
/**
 * 请求拦截器
 * @param config 
 * @returns 
 */
function requestInceptorsSuccess(config: AxiosRequestConfig) {
    // console.log("请求成功config:", config)
    const params = config.params ? config.params : {}
    config.params = {
        ...params,
        cookie: `MUSIC_U=${getCookie("MUSIC_U")}`,
        timestamp: new Date().getTime()
    }
    return config
}
```

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
