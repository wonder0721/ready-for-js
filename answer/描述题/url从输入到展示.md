1. 输入地址

   - url 判断

2. 查找浏览器本地缓存，存在强缓存的情况下直接返回文件 200 没有命中强缓存的话开始进行网络连接

3. 浏览器查找域名的 IP 地址 端口号默认 80

   1. 请求一旦发起，浏览器首先要做的事情就是解析这个域名，一般来说，浏览器会首先查看本地硬盘的 hosts 文件，看看其中有没有和这个域名对应的规则，如果有的话就直接使用 hosts 文件里面的 ip 地址。

   2. 如果在本地的 hosts 文件没有能够找到对应的 ip 地址，浏览器会发出一个 DNS 请求到本地 DNS 服务器 。本地 DNS 服务器一般都是你的网络接入服务器商提供，比如中国电信，中国移动。

   3. 查询你输入的网址的 DNS 请求到达本地 DNS 服务器之后，本地 DNS 服务器会首先查询它的缓存记录，如果缓存中有此条记录，就可以直接返回结果，此过程是递归的方式进行查询。如果没有，本地 DNS 服务器还要向
      DNS 根服务器进行查询。

   4. 根 DNS 服务器没有记录具体的域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，你可以到域服务器上去继续查询，并给出域服务器的地址。这种过程是迭代的过程。

   5. 本地 DNS 服务器继续向域服务器发出请求，在这个例子中，请求的对象是.com 域服务器。.com 域服务器收到请求之后，也不会直接返回域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，你的域名的解析服务器的
      地址。

   6. 最后，本地 DNS 服务器向域名的解析服务器发出请求，这时就能收到一个域名和 IP 地址对应关系，本地 DNS 服务器不仅要把 IP 地址返回给用户电脑，还要把这个对应关系保存在缓存中，以备下次别的用户查询时，可
      以直接返回结果，加快网络访问。

4. 建立 TCP 连接 (三次握手)

   - 如果请求协议是 HTTPS，那么还需要建立 TLS 连接

   - http/1.1 一个 tcp 同时只能处理一个请求，浏览器会为每个域名维护 6 个 tcp 连接！但是每个 tcp 连接是可以复用的，也就是处理完一个请求之后，不断开这个 tcp 连接，可以用来处理下个 http 请求！不过 http2 是可以并行请求资源的，所以如果使用 http2，浏览器只会为每个域名维护一个 tcp 连接

5. 浏览器向 web 服务器发送一个 HTTP 请求

   - 请求行（请求方法 URI http 版本）
   - 请求头（包含了浏览器所使用的操作系统、浏览器内核等信息，以及当前请求的域名信息、浏览器端的 Cookie 信息等等）
   - if modified since if-none-match
   - 请求体 （载体数据）

6. 服务器端处理 HTTP 请求

   - 响应行（包括协议版本和状态码）
   - 如果是 301、302 重定向 说明服务器需要浏览器重定向到其他 URL。这时网络进程会从响应头的 Location 字段里面读取重定向的地址，然后再发起新的 HTTP 或者 HTTPS 请求，一切又重头开始了
   - 响应头 （包含了服务器自身的一些信息，比如服务器生成返回数据的时间、返回的数据类型，以及服务器要在客户端保存的 Cookie 等信息）
   - cache-control max-age last-modified etag
   - 304 not-modified 命中协商缓存

7. 断开 TCP 连接 （四次挥手）

   - 如果浏览器或者服务器在其头信息中加入了 Connection:Keep-Alive (http1.1) （TCP 连接在发送后将仍然保持打开状态，这样浏览器就可以继续通过同一个 TCP 连接发送请求。保持 TCP 连接可以省去下次请求时需要建立连接的时间，提升资源加载速度）

8. 浏览器接收到 html 文件资源开始渲染页面
