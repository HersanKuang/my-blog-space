
# Volta 常用命令

Volta 是一个 JavaScript 工具管理器，用于管理 Node.js 和 Yarn/NPM 等工具的版本。以下是一些常用的 Volta 命令：

### Volta 安装和更新

1. **安装 Volta：**
   ```sh
   curl https://get.volta.sh | bash
   ```

2. **更新 Volta：**
   ```sh
   volta upgrade
   ```

### Node.js 相关命令

3. **安装 Node.js：**
   ```sh
   volta install node
   ```

4. **安装特定版本的 Node.js：**
   ```sh
   volta install node@14
   ```

5. **设置默认的 Node.js 版本：**
   ```sh
   volta install node@14
   ```

6. **查看当前 Node.js 安装路径：**
   
   ```sh
   volta which node
   ```
   
7. **列出所有已安装的 Node.js 版本：**
   ```sh
   volta list node
   ```

### Yarn/NPM 相关命令

8. **安装 Yarn：**
   ```sh
   volta install yarn
   ```

9. **安装特定版本的 Yarn：**
   ```sh
   volta install yarn@1.22.5
   ```

10. **设置默认的 Yarn 版本：**
    
    ```sh
    volta install yarn@1.22.5
    ```
    
11. **查看当前 Yarn 安装路径：**
    
    ```sh
    volta which yarn
    ```
    
12. **安装 NPM：**
    ```sh
    volta install npm
    ```

13. **安装特定版本的 NPM：**
    ```sh
    volta install npm@6.14.11
    ```

14. **设置默认的 NPM 版本：**
    
    ```sh
    volta install npm@6.14.11
    ```
    
15. **查看当前 NPM 安装路径：**
    
    ```sh
    volta which npm
    ```

### 工具管理

16. **卸载某个工具：**

    - volta uninstall 命令允许您删除使用 voltall install 安装的任何`全局软件包` `(volta 无法删除 node 以及 包管理器)。需要进入资源目录手动删除`

    ```sh
    volta uninstall node
    volta uninstall yarn
    volta uninstall npm
    ```

17. **列出所有已安装的工具及其版本：**
    ```sh
    volta list
    ```

18. **查看当前正在使用的工具版本：**
    ```sh
    volta current
    ```

### 项目配置

19. **为项目设置特定版本的 Node.js：**
    ```sh
    volta pin node@14
    ```

20. **为项目设置特定版本的 Yarn：**
    
    ```sh
    volta pin yarn@1.22.5
    ```
    
21. **为项目设置特定版本的 NPM：**
    ```sh
    volta pin npm@6.14.11
    ```

22. **查看项目的配置：**
    ```sh
    volta pin
    ```

### 其他命令

23. **运行命令时使用特定版本的 Node.js：**
    
    ```sh
    volta run node@12 -- node myscript.js
    ```
    
25. **显示 Volta 版本：**
    
    ```sh
    volta --version
    ```
