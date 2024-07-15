/**
 * 0 表示 off
 * 1 表示 warn
 * 2 表示 error
 */
module.exports = {
  // 指定运行的环境
  env: {
    browser: true, // 浏览器环境
    es6: true, // es6 所有语法的环境
    node: true, // node 环境
    es2021: true // 使用 ES2021 的语法支持
  },
  // 扩展配置, 即导入第三方的配置规则文件
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended', // 使用 ESLint 的推荐规则
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // 使用 TypeScript 插件的推荐规则
    'plugin:prettier/recommended', // 启用 Prettier 插件，确保代码风格的一致性
    'prettier' // 覆盖 eslint 的代码格式
  ],
  // 指定解析器
  parser: '@typescript-eslint/parser',
  // 插件配置
  plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'prettier', 'react-hooks'],
  // 规则配置
  rules: {
    'prettier/prettier': 'error', // Prettier 的错误显示为 ESLint 错误
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
    ],
    '@typescript-eslint/no-explicit-any': 0, // 关闭不能声明 any 类型的警告
    '@typescript-eslint/no-inferrable-types': 0, // 关闭可以自动类型推断时, 不用显式声明类型的错误
    '@typescript-eslint/no-non-null-assertion': 0, // 关闭不能使用断言
    '@typescript-eslint/no-shadow': 2, // 开启 TS 全局变量和局部变量同名的报错警告
    '@typescript-eslint/explicit-module-boundary-types': 0, // 关闭 TS 必须书写函数返回值类型的警告

    'no-console': 0, // 关闭 console 警告
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0, // debugger 的设置
    'no-bitwise': 0, // 关闭不能使用位运算
    'no-param-reassign': 0, // 关闭函数的参数是对象时, 不能更改该对象属性的限制
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // 关闭 for 语句不能使用一元表达式
    'no-continue': 0, // 关闭循环语法不能使用 continue
    'default-case': 0, // 关闭 switch 必须要有 default 语句
    'comma-dangle': [
      2,
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ], // 配置尾逗号规则
    'linebreak-style': 0, // 关闭换行符的规则
    'arrow-body-style': 0, // 关闭箭头函数体规则
    'consistent-return': 0, // 关闭函数条件返回规则
    'import/extensions': 0, // 配置引入本地文件无后缀
    'import/no-unresolved': 0, // eslint 无法识别检测导入语句中的模块是否存在
    'import/no-extraneous-dependencies': 0, // 关闭 package.json 的 dependencies 无依赖项而不得使用的限制
    'import/prefer-default-export': 0, // 关闭模块文件只有一个元素导出时, 必须使用默认导出的限制
    'no-underscore-dangle': 0, // 关闭不能使用 '_' 下划线命名的规则
    'no-restricted-exports': 0, // 关闭不能使用 default 作为导出名

    radix: 0, // 关闭 parseInt 需要传入第二参数的限制
    indent: [2, 2, { SwitchCase: 1 }], // 配置缩进规则, 必须是缩进 2 个空格
    'operator-linebreak': 0, // 关闭拼接符限制

    // React 相关规则
    'react/jsx-indent': [2, 2], // JSX 必须缩进 2 个空格
    'jsx-a11y/alt-text': 0, // 关闭 JSX 的 img 标签必须添加 alt 属性的限制
    'react/jsx-indent-props': 0, // 关闭 JSX 元素属性换行的限制
    'jsx-a11y/anchor-is-valid': 0, // 关闭 JSX 的 a 标签的限制
    'react/state-in-constructor': 0, // 关闭 react 类组件的 state 必须写构造函数内的规则
    'react/require-default-props': 0, // 关闭 react 对不是必要的属性 props 必须设置默认值的限制
    'react/jsx-props-no-spreading': 0, // 关闭 JSX 不能使用扩展符的限制
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', 'ts', '.jsx', '.js'] }], // JSX 文件扩展名的设置
    'react/prop-types': 0, // 关闭 react 组件属性验证
    'jsx-a11y/click-events-have-key-events': 0, // 关闭 JSX 的事件必须伴随其它事件的限制
    'jsx-a11y/no-static-element-interactions': 0, // 关闭 JSX 的事件必须配置角色身份才能使用的限制
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 关闭不是交互元素不允许绑定事件的限制
    'react/no-invalid-html-attribute': 0, // 关闭检查标准的HTML rel属性值的限制
    'react/button-has-type': 0, // 关闭按钮的类型检查
    'react/react-in-jsx-scope': 0, // 关闭必须引入的 React 的 jsx 作用域
    'react/function-component-definition': 0
  },
  ignorePatterns: ['.eslintrc.js'] // 忽略 ESLint 检查的文件
};
