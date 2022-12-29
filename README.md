# suspack

리액트의 Suspense를 사용하여 비동기 컴포넌트를 원격으로 렌더링하는 방법을 알아봅니다.

## 설치

suspack 라이브러리는 아래와 같이 설치한다. 

```bash
npm install suspack
```


## 사용법

### 원격 컴포넌트 로드

suspack 클라이언트를 사용해서 원격에 있는 컴포넌트들을 baseUrl 기반으로 로드한다. 

```tsx
import React from 'react';
import { render } from 'react-dom';
import suspack from 'suspack';

const suspackInstance = suspack.InitializeReact({
    React,
    baseUrl: 'http://localhost:3000',
})

const RemoteComponent1 = lazy(suspackInstance('/component/View1.js'));
const RemoteComponent2 = lazy(suspackInstance('/component/View2.js'));
const RemoteComponent3 = lazy(suspackInstance('/component/View3.js'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
        <RemoteComponent1 />
        <RemoteComponent2 />
        <RemoteComponent3 />
    </Suspense>
  );
};

```


### 원격 컴포넌트 생성

원격에 있는 컴포넌트는 로컬에 있는 컴포넌트와 빌드 방식이 다르기 때문에  몇가지  의존성을 공유해야한다.  
그래서 리액트 버전은 항상 React 를 넘길 수 있도록 한다. 

default 로 생성된 함수는  다음과 같다. 

```tsx

// filename=/component/View1.js

// 컴포넌트 초기화 함수 
export default function View(config) {
    const {React} = config;

    // 렌더링될 컴포넌트 생성 
    return function () {
        return React.createElement("div", null, "View1");
    }
}

```

React 버전의 의존성을 config 를 통해서 전달한다. 내부에서 사용되는 모든 React 컴포넌트들은 React 객체를 그대로 이용할 수 있도록 빌드가 되어야 한다. 

빌드는 아래 처럼 해보자. 

### 원격 컴포넌트 빌드

여기서는 편의상 vite 를 사용한 빌드를 구축한다. 

apps/vite-propject 에 vite.component.config.js 를 참조하자.

```js
export default defineConfig({
  mode: "production",
  build: {
    minify: false,
    emptyOutDir: false,
    outDir: "public/component",
    lib: {
      name: "vite-project",
      formats: ["es"],
      entry: {
        ...entries,
      }
    },
  },
})
```

vite 는 react 컴포넌트를 빌드 할 때 React 를 import 하지 않는다. jsx 구문을 React.xxx 로 자동으로 변환시켜주는데  이것은 esbuild 를 사용하기 때문이다.

샘플 파일을 만들어보자. 
간단한 원격 리액트 컴포넌트 원본이다. 

다만 여기서는 jsx 를 그대로 사용하고 있기 때문에 빌드를 해줘야한다. 

```tsx
import type { SuspackConfigOptions } from "suspack";

export default function External (config: SuspackConfigOptions) {
    const { React } = config;
    function App() {
        return (
            <div>
            <h1>External</h1>
            </div>
        );
    }

    return function View() {
        return <App />
    }
}
```

vite 를 통해서 빌드를 해보자. 
결과물은 아래와 같이 나온다. 

```js
function External(config) {
  const { React } = config;
  function App() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "External"));
  }
  return function View() {
    return /* @__PURE__ */ React.createElement(App, null);
  };
}
export {
  External as default
};

```

External 함수는 config 를 받아서 React 를 사용할 수 있도록 한다.
jsx 로 되어 있던 모든 구문들은 React.xxx 형태로 변환이 되었다. 
config 에서 전달된 React 컴포넌트를 그대로 사용할 수 있게 되는 것이다. 


## 로컬 테스크 

아래 커맨드로 원격 컴포넌트를 간단하게 테스트 할 수 있다. 

```js
git clone xxx 
cd xxx
npm install
npm run suspack:dev 

// 터미널 2개
npm run suspack:component:watch 
```

http://localhost:5173/ 로 접속하면 원격 컴포넌트가 렌더링 된다. 

원격 컴포넌트 테스트 버전은  apps/vite-project/src/component/ 디렉토리에 있다. 


# LICENSE MIT(?)