## GitLab-CI 

### CI (Continuous Integration)
先了解持续集成是什么
> 持续集成是一种软件开发实践，即团队开发成员经常集成他们的工作，通常每个成员每天至少集成一次，也就意味着每天可能会发生多次集成。每次集成都通过自动化的构建（包括编译，发布，自动化测试)来验证，从而尽快地发现集成错误。许多团队发现这个过程可以大大减少集成的问题，让团队能够更快的开发内聚的软件

GitLab-CI就是一套配合GitLab使用的持续集成系统（当然，还有其它的持续集成系统，同样可以配合GitLab使用，比如Jenkins）。而且GitLab8.0以后的版本是默认集成了GitLab-CI并且默认启用的。

只要在项目仓库的根目录添加`.gitlab-ci.yml`文件，并且配置了Runner（运行器），Runner会轮询检测gitlab上的任务，那么每一次合并请求（MR）或者push都会触发CI [pipeline](https://link.segmentfault.com/?enc=xbgdrkcoyiLfBYWBxULyPA%3D%3D.ED7wFBeMCj9YbaLu4CUTNaVzocT3qRDrLkd8BqCV8wXpRvh72SQoDKvc10pCKEwO)。

---

### pipeline 
Pipelines是定义于 `.gitlab-ci.yml` 中的不同阶段的不同任务。
Pipelines理解为流水线，流水线包含有多个阶段（stages），每个阶段包含有一个或多个工序（jobs），每一次push或者MR都要经过流水线之后才可以合格出厂。而 `.gitlab-ci.yml` 正是定义了这条流水线有哪些阶段，每个阶段要做什么事。
[示意图](C:\Users\Administrator\Desktop\Note\无标题.png)

---

### Gitlab-runner
Gitlab-runner是.gitlab-ci.yml脚本的运行器，Gitlab-runner是基于Gitlab-CI的API进行构建的相互隔离的机器（或虚拟机）。GitLab Runner 不需要和Gitlab安装在同一台机器上，但是考虑到GitLab Runner的资源消耗问题和安全问题，也不建议这两者安装在同一台机器上

GitLab-Runner可以分类两种类型：Shared Runner（共享型）和Specific Runner（指定型）。

---

#### GitLab-Runner的安装与使用
- 安装gitlab-ci-multi-runner
   1. 如果想要使用docker runner，则需要安装docker。（可选）
```
curl -sSL https://get.docker.com/ | sh
```
   2. 添加Gitlab的官方源：
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
```
   3. 安装
```
yum install gitlab-ci-multi-runner
```
-  使用gitlab-ci-multi-runner注册Runner
   1. 注册Runner
Runner需要注册到Gitlab才可以被项目所使用，一个gitlab-ci-multi-runner服务可以注册多个Runner
向GitLab-CI注册一个Runner需要两样东西：GitLab-CI的url和注册token。
其中，token是为了确定你这个Runner是所有工程都能够使用的Shared Runner还是具体某一个工程才能使用的Specific Runner。
```
$ sudo gitlab-ci-multi-runner register

Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
https://mygitlab.com/ci
Please enter the gitlab-ci token for this runner
xxx-xxx-xxx
Please enter the gitlab-ci description for this runner
my-runner
INFO[0034] fcf5c619 Registering runner... succeeded
Please enter the executor: shell, docker, docker-ssh, ssh?
docker
Please enter the Docker image (eg. ruby:2.1):
node:4.5.0
INFO[0037] Runner registered successfully. Feel free to start it, but if it's
running already the config should be automatically reloaded!
```
   2. 更新Runner
如果需要更新Runner，只需要执行以下脚本：
```
# For CentOS
sudo yum update
sudo yum install gitlab-ci-multi-runner
```

GitLab-CI会为这个Runner生成一个唯一的token，以后Runner就通过这个token与GitLab-CI进行通信

---

###  `.gitlab-ci.yml` 文件配置
1. 在项目根目录添加 `.gitlab-ci.yml` 文件
关于该文件的各项配置[官方文档](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html)
2. 示例：
```
# 这里使用了自己的docker image，配置了自己需要的环境
image: wuyanxin/node

variables:
MYSQL_DATABASE: wan_ark-unit
MYSQL_ALLOW_EMPTY_PASSWORD: "yes"

# 关于service请见: http://docs.gitlab.com/ce/ci/docker/using_docker_images.html#what-is-service
services:
- mysql:5.6
- redis:3.2.4

stages:
- lint
- install
- deploy

before_script:
  - echo 'REDIS_HOST=redis' >> .env
  - echo 'DB_HOST=mysql' >> .env
  - yarn install

lint: 
stage: lint
script:
  - npm run lint
allow_failure: true

install:
stage: install
script:
  - npm install
  - npm test
  
deploy_build:
stage: deploy
script:
  - npm run build:test
  - echo 'npm run build success!'
only: 
  - master

deploy_publish:
stage: deploy
script:
  - echo 'deployd publish success!'
only: 
  - master
```
---

### 参考资料
[https://segmentfault.com/a/1190000007180257](https://segmentfault.com/a/1190000007180257)
[https://flura.cn/2019/09/29/%E5%89%8D%E7%AB%AFgitlab-ci%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/](https://flura.cn/2019/09/29/%E5%89%8D%E7%AB%AFgitlab-ci%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/)
[https://juejin.cn/post/6844903728546316295](https://juejin.cn/post/6844903728546316295)
[https://docs.gitlab.com/runner/](https://docs.gitlab.com/runner/)
[https://juejin.cn/post/6971013569986953223](https://juejin.cn/post/6971013569986953223)
[https://www.cnblogs.com/cnundefined/p/7095368.html](https://www.cnblogs.com/cnundefined/p/7095368.html)
[https://blog.csdn.net/weixin_40046357/article/details/108396257](https://blog.csdn.net/weixin_40046357/article/details/108396257)