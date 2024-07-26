/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    cssnano: {
      preset: ['advanced', {
        // 删除不必要的浏览器样式前缀
        autoprefixer: true,
        // 根据属性名称对CSS声明进行排序压缩
        cssDeclarationSorter: true,
        // 尽可能减少CSS calc 表达式
        calc: true,
        // 最小化字体属性
        colormin: true,
        // 等效转化压缩长度、时间和角度
        convertValues: true,
        // 移除所有 CSS 注释
        discardComments: {
          removeAll: true
        },
        // 删除所有重复的css规则
        discardDuplicates: true,
        // 移除空白选择器和声明
        discardEmpty: true,
        // 删除具有相同标识符的规则
        discardOverridden: true,
        // 删除未使用的css规则
        discardUnused: true,
        // 合并相同规则的css
        mergeIdents: true,
        // 将长格式属性合并为简写属性
        mergeLonghand: true,
        // 合并具有相同选择器的多个规则
        mergeRules: true,
        // 最小化字体属性
        minifyFontValues: true,
        // 最小化线性和径向梯度参数
        minifyGradients: true,
        // 删除多余空格
        minifyParams: true,
        // 压缩选择器
        minifySelectors: true,
        // 规范压缩字符集
        normalizeCharset: true,
        // 将双值语法规范为单值语法
        normalizeDisplayValues: true,
        // 标准化重复属性值
        normalizePositions: true,
        // 标准化重复样式
        normalizeRepeatStyle: true,
        // 标准化字符串
        normalizeString: true,
        // 压缩定时函数
        normalizeTimingFunctions: true,
        // 规范化字体权重表示
        normalizeUnicode: true,
        // 标准化 URL 值
        normalizeUrl: true,
        // 压缩空格
        normalizeWhitespace: true,
        // 规范属性顺序
        orderedValues: true,
        // 重命名at-rules
        reduceIdents: true,
        // 将CSS initial 关键字替换为实际值
        reduceInitial: true,
        // 压缩转换函数
        reduceTransforms: true,
        // 压缩内联SVG
        svgo: true,
        // 对每个规则的选择器进行排序，并删除重复项
        uniqueSelectors: true
      }]
    }
  }
};

export default config;
