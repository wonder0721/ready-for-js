module.exports = class ThemeSplitPlugin {
  constructor(options) {
    this.options = options
    this.timestamp = new Date().getTime()
  }
  insertScript(data, timestamp) {
    const scriptStr = `<script>
    ;(function () {
      const ID = "dynamic-theme-link"
      const targetNode = document.documentElement
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: false, subtree: false }
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified on html.')
            const currentTheme = targetNode.getAtrribute('data-theme')
            const linkEle = document.createElement('link')
            linkEle.id = ID
            linkEle.href = "/static/theme/"+currentTheme+"-"+${timestamp}+".css?"
            document.head.removeChild(document.getElementById(ID))
            document.head.appendChild(linkEle)
          }
        }
      }
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(callback)
      // 以上述配置开始观察目标节点
      observer.observe(targetNode, config)
    })()
  </script>`
    return data.replace('<!-- ThemeSplitPlugin script placeholder -->', scriptStr)
  }
  apply(compiler) {
    console.log(`Hello ThemeSplitPlugin`)
    compiler.hooks.compilation.tap('ThemeSplitPlugin', (compilation) => {
      // html-webpack-plugin-before-html-generation是htmlWebpakcPlugin的一个事件 代表html文件生成之前 可以在这里进行修改操作
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        // 插入监听html data-theme属性变化的脚本 通过MutationObserver进行属性监测
        htmlPluginData.html = this.insertScript(htmlPluginData.html, this.timestamp)
      })
    })
    compiler.hooks.emit.tapAsync('ThemeSplitPlugin', (compilation, callback) => {
      let appChuck = compilation.chunks.find((v) => v.name === 'app') // console.log("appChuck", appChuck.files);
      let filename = appChuck.files[0]
      // app.[hash].css文件中的内容
      let appSourceCss = compilation.assets[filename].source()

      // 检测主题色选择器的正则
      const themeDefaultReg = /\[data-theme=default\](.*?)\}/g
      const themeLightReg = /\[data-theme=light\](.*?)\}/g
      const themeCityBluetReg = /\[data-theme=cityblue\](.*?)\}/g

      // 提取主体颜色字符串
      const themeArr = [
        {
          name: 'default',
          source: appSourceCss.match(themeDefaultReg) ? appSourceCss.match(themeDefaultReg).join('') : ''
        },
        {
          name: 'light',
          source: appSourceCss.match(themeLightReg) ? appSourceCss.match(themeLightReg).join('') : ''
        },
        {
          name: 'cityblue',
          source: appSourceCss.match(themeCityBluetReg) ? appSourceCss.match(themeCityBluetReg).join('') : ''
        }
      ]

      // 将app.[hash].css文件中的主题色相关标签选择器全部删除 减少文件体积
      const appCssStr = appSourceCss.replace(/\[data-theme=(.*?)\}/g, '')
      compilation.assets[filename] = {
        source: function () {
          return appCssStr
        },
        size: function () {
          return appCssStr.length
        }
      }
      // 将这个列表对应的主题css文件作为新的文件资源生成，插入到 webpack 构建目标中的theme文件夹中：
      // 添加时间戳防止浏览器缓存
      themeArr.forEach((item) => {
        compilation.assets[`static/theme/${item.name}-${this.timestamp}.css`] = {
          source: function () {
            return item.source
          },
          size: function () {
            return item.source.length
          }
        }
      })
      // console.log('assets', Object.keys(compilation.assets))

      callback()
    })
  }
}
