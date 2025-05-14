## deploy

### 项目打包

1. 在服务器或者开发机打包项目到 deploy；

   ```
   cd litemall
   cat ./litemall-db/sql/litemall_schema.sql > ./deploy/db/litemall.sql
   cat ./litemall-db/sql/litemall_table.sql >> ./deploy/db/litemall.sql
   cat ./litemall-db/sql/litemall_data.sql >> ./deploy/db/litemall.sql

   cd ./litemall-admin
   npm install --registry=https://registry.npm.taobao.org
   npm run build:dep

   cd ..
   mvn clean package
   cp -f ./litemall-all/target/litemall-all-*-exec.jar ./deploy/litemall/litemall.jar
   ```

   这里的工作是：

   1. 把数据库文件拷贝到 deploy/db 文件夹
   2. 编译 litemall-admin 项目
   3. 编译 litemall-all 模块，同时把 litemall-admin 编译得到的静态文件拷贝到
      litemall-all 模块的 static 目录

2. 修改 litemall 文件夹下面的\*.yml 外部配置文件，当 litemall-all 模块启动时会
   加载外部配置文件，而覆盖默认 jar 包内部的配置文件。
   例如，配置文件中一些地方需要设置成远程服务器的 IP 地址

此时 deploy 部署包结构如下：

- bin

存放远程服务器运行的脚本，包括 deploy.sh 脚本和 reset.sh 脚本

- db

存放 litemall 数据库文件

- litemall

存放远程服务器运行的代码，包括 litemall-all 二进制可执行包和 litemall 外部配置文件

- util
  存放开发服务器运行的脚本，包括 package.sh 脚本和 lazy.sh 脚本。
  由于是本地开发服务器运行，因此开发者可以不用上传到远程服务器。

### 项目部署

1. 远程服务器环境（MySQL 和 JDK1.8）已经安装好，请确保云服务器的安全组已经允许相应的端口。
2. 导入 db/litemall.sql
   ```bash
   cd /home/ubuntu/deploy/db
   mysql -h localhost -u $ROOT -p$PASSWORD < litemall.sql
   ```
3. 启动服务
   ```bash
   sudo service litemall stop
   sudo ln -f -s /home/ubuntu/deploy/litemall/litemall.jar /etc/init.d/litemall
   sudo service litemall start
   ```
4. 测试是否部署成功(xxx.xxx.xxx.xxx 是云服务器 IP）：
   ```
   http://xxx.xxx.xxx.xxx:8081/wx/index/index
   http://xxx.xxx.xxx.xxx:8081/admin/index/index
   http://xxx.xxx.xxx.xxx:8081/#/login
   ```

### 项目辅助脚本

在前面的项目打包和项目部署中都是采用手动命令来部署。
这里可以写一些脚本简化：

- util/packet.sh

在开发服务器运行可以自动项目打包

- util/lazy.sh

在开发服务器运行可以自动项目打包、项目上传远程服务器、自动登录系统执行项目部署脚本。

注意：

> 1. 开发者需要在 util/lazy.sh 中设置相应的远程服务器登录账号和密钥文件路径。
> 2. 开发者需要在 bin/reset.sh 设置远程服务器的 MySQL 的 root 登录账户。

- bin/deploy.sh

在远程服务器运行可以自动部署服务

- bin/reset.sh

在远程服务器运行可以自动项目导入数据、删除本地上传图片、再执行 bin/deploy.sh 部署服务。

注意：

> 开发者需要在 bin/reset.sh 设置远程服务器的 MySQL 的 root 登录账户。

总结，当开发者设置好配置信息以后，可以在本地运行 lazy.sh 脚本自动一键部署:

```bash
cd litemall
./deploy/util/lazy.sh
```

不过由于需要设置的信息会包含敏感安全信息，强烈建议开发者参考这里的 deploy 文件夹，
然后实现自己的 deploy 文件夹，妥善处置外部配置文件和脚本中的敏感安全信息!!!
