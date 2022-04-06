##  Node Version
* 16.13.2

## Design FrameWork
* bootstrap5
* material ui5

## Sidebar
* [react-pro-sidebar](https://github.com/azouaoui-med/react-pro-sidebar)

## Settings
1. ***n*** Package Install
    ```shell
    npm install -g n # Window는 n 패키지가 없음.
    n 16.13.2
    n   # 엔터 후 ο node/16.13.2 선택
    ```
2. ***yarn*** Package Install
    ```shell
    npm install -g yarn
    ```
3. ***node_modules*** Install
    ```shell
    yarn
    ```

## .env
1. ***Local or Development Server*** dotEnv Setting
    ```env
    # .env.local/.env.development 파일 생성
    
    # 렌더링 인디케이터 활성/비활성화
    REACT_APP_USE_RENDER_INDICATOR=true

    # API Host
    REACT_APP_API_HOST="127.0.0.1"

    # Report Host
    REACT_APP_REPORT_HOST="127.0.0.1"
    ```

2. ***Production Server*** dotEnv Setting
    ```env
    # .env.production 파일 생성
    
    # 렌더링 인디케이터 활성/비활성화
    REACT_APP_USE_RENDER_INDICATOR=false

    # API Host
    REACT_APP_API_HOST="127.0.0.1"

    # Report Host
    REACT_APP_REPORT_HOST="127.0.0.1"
    ```

## Project Local Start
```shell
yarn start
```

## Project Build
```shell
yarn build
```

## 배포서버
* http://3.39.143.218/
