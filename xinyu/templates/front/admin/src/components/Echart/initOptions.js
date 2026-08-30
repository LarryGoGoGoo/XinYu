/**
 * @description 获取不同图表的options
 */

let type_fn_map = {
  横: getBar,
  竖: getBar,
  圆: getBar3,
  饼: getPie,
  饼2: getPie,
  饼3: getPie,
  漏: getFunnel,
  漏多1: getFunnels,
  漏多2: getFunnels,
  漏多3: getFunnels,
  漏多4: getFunnels,
  折: getLine,
  折滑: getLine,
  折面: getLine,
  折滑面: getLine,
  折多: getLines,
  仪: getGauge,
  词云: getWordCloud,
  地: getChinaMap,
  雷: getRadar,
}

function getInitOptions(chartData, themeConfig, limitNum, configData) {
  let graphType = configData.graphType
  let fn = null
  if (graphType.startsWith('地')) {
    fn = getChinaMap
  } else {
    fn = type_fn_map[graphType]
  }

  if (!fn) {
    ElMessage.error(`图表: ${graphType}，暂时不支持。`)
    return {}
  }

  return fn(chartData, themeConfig, limitNum, configData)
}

function getBar(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, graphType, typeSections, hasMultiSeries } = configData

  let xAxis, yAxis
  if (graphType == '横') {
    // 横向的
    xAxis = {
      ...themeConfig.xAxis,
      type: 'value',
    }
    yAxis = {
      ...themeConfig.yAxis,
      type: 'category',
      // 限制个数
      data: chartData.slice(0, limitNum).map(item => item[xColumn]),
    }
  } else {
    // 竖
    xAxis = {
      ...themeConfig.xAxis,
      type: 'category',
      data: chartData.slice(0, limitNum).map(item => item[xColumn]),
    }
    yAxis = {
      ...themeConfig.yAxis,
      type: 'value',
    }
  }

  // series 根据 typeSections 区分 多还是单
  let series = []
  if (hasMultiSeries && typeSections && typeSections.length) {
    // 多
    series = typeSections.map((section, index) => {
      return {
        ...themeConfig.series,
        data: chartData.slice(0, limitNum).map(item => item[section]),
        type: 'bar',
        name: section,
      }
    })
  } else {
    // 单
    series = [
      {
        ...themeConfig.series,
        data: chartData.slice(0, limitNum).map(item => item.total),
        type: 'bar',
      },
    ]
  }

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: themeConfig.tooltip,
    // x轴
    xAxis,
    // y轴
    yAxis,
    series: series,
  }

  return options
}

function getBar3(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, graphType, typeSections } = configData

  let radiusAxis = {
    ...themeConfig.radiusAxis,
    data: chartData.slice(0, limitNum).map(item => item[xColumn]),
  }

  // series
  let series = [
    {
      ...themeConfig.series,
      data: chartData.slice(0, limitNum).map(item => item.total),
      type: 'bar',
      coordinateSystem: 'polar',
    },
  ]

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: themeConfig.tooltip,
    polar: {
      radius: [30, '80%'],
      ...themeConfig.polar,
    },
    angleAxis: {
      startAngle: 75,
      ...themeConfig.angleAxis,
    },
    radiusAxis,
    series: series,
  }

  return options
}
function getPie(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, graphType, seriesData } = configData

  if (!seriesData) {
    seriesData = chartData
  }

  let seriesObj = {}
  switch (graphType) {
    case '饼':
      seriesObj.radius = '75%'
      break

    case '饼2':
      seriesObj.radius = ['40%', '75%']
      break

    case '饼3':
      seriesObj.radius = ['25%', '75%']
      seriesObj.roseType = 'area'
      break
  }
  seriesObj = {
    ...seriesObj,
    type: 'pie',
    data: seriesData.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
    ...themeConfig.series,
  }

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      trigger: 'item',
      ...themeConfig.tooltip,
    },
    series: [seriesObj],
  }

  return options
}
function getFunnel(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn } = configData
  let seriesObj = {
    name: title,
    data: chartData.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
    type: 'funnel',
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
    minSize: '0%',
    maxSize: '100%',
    ...themeConfig.series,
  }

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}',
      ...themeConfig.tooltip,
    },
    series: [seriesObj],
  }

  return options
}
function getFunnels(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, graphType, subNameList } = configData

  switch (graphType) {
    // 限制两组
    case '漏多1':
    case '漏多2':
      chartData = chartData.slice(0, 2)
      break

    // 限制四组
    case '漏多3':
    case '漏多4':
      chartData = chartData.slice(0, 4)
      break
  }

  // 漏多
  let series = []
  switch (graphType) {
    case '漏多1':
      chartData.forEach((data, index) => {
        let seriesObj = {}
        // 1,2组数据的差异配置
        if (index === 0) {
          seriesObj.top = '5%'
        } else {
          seriesObj.top = '50%'
          seriesObj.sort = 'ascending'
        }
        seriesObj = {
          ...seriesObj,
          name: subNameList[index],
          data: data.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
          type: 'funnel',
          width: '80%',
          height: '45%',
          funnelAlign: 'center',
          left: '10%',
          ...themeConfig.series,
        }
        series.push(seriesObj)
      })
      break

    case '漏多2':
      chartData.forEach((data, index) => {
        let seriesObj = {}
        // 1,2组数据的差异配置
        if (index === 0) {
          seriesObj.top = '5%'
          seriesObj.sort = 'ascending'
        } else {
          seriesObj.top = '50%'
        }
        seriesObj = {
          ...seriesObj,
          name: subNameList[index],
          data: data.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
          type: 'funnel',
          width: '80%',
          height: '45%',
          funnelAlign: 'center',
          left: '10%',
          ...themeConfig.series,
        }
        series.push(seriesObj)
      })
      break

    case '漏多3':
      chartData.forEach((data, index) => {
        let seriesObj = {}
        // 1,2,3,4组数据的差异配置
        if (index === 0) {
          seriesObj.left = '5%'
          seriesObj.top = '5%'
          seriesObj.sort = 'ascending'
        } else if (index === 1) {
          seriesObj.left = '5%'
          seriesObj.top = '50%'
        } else if (index === 2) {
          seriesObj.left = '55%'
          seriesObj.top = '5%'
        } else {
          seriesObj.left = '55%'
          seriesObj.top = '50%'
          seriesObj.sort = 'ascending'
        }
        seriesObj = {
          ...seriesObj,
          // Todo:subName
          name: subNameList[index],
          data: data.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
          type: 'funnel',
          width: '40%',
          height: '45%',
          funnelAlign: 'center',
          ...themeConfig.series,
        }
        series.push(seriesObj)
      })
      break

    case '漏多4':
      chartData.forEach((data, index) => {
        let seriesObj = {}
        // 1,2,3,4组数据的差异配置
        if (index === 0) {
          seriesObj.left = '5%'
          seriesObj.top = '50%'
          seriesObj.funnelAlign = 'right'
        } else if (index === 1) {
          seriesObj.left = '5%'
          seriesObj.top = '5%'
          seriesObj.funnelAlign = 'right'
          seriesObj.sort = 'ascending'
        } else if (index === 2) {
          seriesObj.left = '55%'
          seriesObj.top = '5%'
          seriesObj.funnelAlign = 'left'
          seriesObj.sort = 'ascending'
        } else {
          seriesObj.left = '55%'
          seriesObj.top = '50%'
          seriesObj.funnelAlign = 'left'
        }
        seriesObj = {
          ...seriesObj,
          name: subNameList[index],
          data: data.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] })),
          type: 'funnel',
          width: '40%',
          height: '45%',
          ...themeConfig.series,
        }
        series.push(seriesObj)
      })
      break
  }

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}',
      ...themeConfig.tooltip,
    },
    series,
  }

  return options
}
function getLine(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, graphType } = configData

  let seriesObj = {
    ...themeConfig.series,
    data: chartData.slice(0, limitNum).map(item => item.total),
    type: 'line', // 柱状图
  }
  switch (graphType) {
    case '折':
      seriesObj.smooth = false
      delete seriesObj.areaStyle
      break

    case '折滑':
      seriesObj.smooth = true
      delete seriesObj.areaStyle
      break

    case '折面':
      seriesObj.smooth = false
      if (!seriesObj.areaStyle) {
        seriesObj.areaStyle = {}
      }
      break

    case '折滑面':
      seriesObj.smooth = true
      if (!seriesObj.areaStyle) {
        seriesObj.areaStyle = {}
      }
      break
  }

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      ...themeConfig.tooltip,
    },
    // x轴
    xAxis: {
      ...themeConfig.xAxis,
      type: 'category',
      boundaryGap: false,
      data: chartData.slice(0, limitNum).map(item => item[xColumn]),
    },
    // y轴
    yAxis: {
      ...themeConfig.yAxis,
      type: 'value',
    },
    series: [seriesObj],
  }

  return options
}

/**
 * @description 折多
 * @returns
 */
function getLines(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, subNameList } = configData
  let subName_legend = []
  let series = chartData.map((_data, index) => {
    // 系列数据
    let data = _data.slice(0, limitNum).map(item => ({ value: item.total, name: item[xColumn] }))

    /**
     * 解析图表系列名name 和 图表类型type
     * type可能是折线、柱状,根据subName判断
     * 1. 出库数量 折线图
     * 2. 出库数量/line 折线图
     * 3. 出库数量/bar 柱状图
     */
    let subName = subNameList[index]
    let [name, type] = subName.split('/')
    type = type ? type : 'line'
    subName_legend.push(name)

    // 主题配置,默认取 series字段，bar类型取series2
    let seriesConfig = type == 'line' ? themeConfig.series : themeConfig.series2

    return {
      ...seriesConfig,
      data,
      type,
      name,
      areaStyle: null, // 不要 区域填充样式。设置后显示成区域面积图
    }
  })

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: {
      data: subName_legend,
      ...themeConfig.legend,
    },
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      trigger: 'axis',
      ...themeConfig.tooltip,
    },
    // x轴
    xAxis: {
      ...themeConfig.xAxis,
      type: 'category',
      boundaryGap: true, // 两边留白
      data: chartData[0].slice(0, limitNum).map(item => item[xColumn]),
    },
    // y轴
    yAxis: {
      ...themeConfig.yAxis,
      type: 'value',
    },
    series,
  }

  return options
}
function getGauge(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn } = configData
  // serires单项数据
  let seriesObjData = chartData.slice(0, limitNum).map((item, index) => {
    return {
      value: item.total,
      name: item[xColumn],
      title: {
        offsetCenter: [String(-200 + index * 80 + '%'), '80%'],
      },
      detail: {
        offsetCenter: [String(-200 + index * 80 + '%'), '105%'],
      },
    }
  })

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // // 图例组件
    // legend: themeConfig.legend,
    // 直角坐标系内绘图网格
    grid: themeConfig.grid,
    // 提示框组件
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}',
      ...themeConfig.tooltip,
    },
    series: [
      {
        ...themeConfig.series,
        data: seriesObjData,
        type: 'gauge',
      },
    ],
  }
  return options
}
async function getWordCloud(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn } = configData

  // 拷贝option
  let wordCloud = JSON.parse(JSON.stringify(themeConfig.option))
  wordCloud.title && (wordCloud.title.text = title)

  // 数据
  let data = chartData.map(item => ({ value: item.total, name: item[xColumn] }))

  wordCloud.series[0].data = data
  // 颜色 随机
  wordCloud.series[0].textStyle.color = function () {
    return (
      'rgb(' +
      [
        Math.round(160 * Math.random()),
        Math.round(160 * Math.random()),
        Math.round(160 * Math.random()),
      ].join(',') +
      ')'
    )
  }

  let maskImageUrl = wordCloud.maskImageUrl || themeConfig.maskImage

  if (maskImageUrl) {
    let maskImage = await loadImage(maskImageUrl)
    wordCloud.series[0].maskImage = maskImage
  }
  return wordCloud
}

function getChinaMap(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn } = configData
  const options = {
    backgroundColor: themeConfig.backgroundColor,
    title: {
      text: title,
      ...themeConfig.title,
    },
    visualMap: themeConfig.visualMap,
    // 提示框组件
    tooltip: themeConfig.tooltip,
    series: [
      {
        ...themeConfig.series,
        data: chartData.map(item => ({ value: item.total, name: item[xColumn] })),
        type: 'map',
        map: 'china',
      },
    ],
  }
  return options
}

function getRadar(chartData, themeConfig, limitNum, configData) {
  let { title, xColumn, subNameList } = configData

  let mingchengList = chartData[0]?.slice(0, limitNum).map(item => item[xColumn]) || []
  let seriesObj_data = mingchengList.map((mingcheng, index) => {
    let value = []

    chartData.forEach(list => {
      value.push(list[index].total)
    })

    return {
      value,
      name: mingcheng,
    }
  })

  let seriesObj = {
    tooltip: {
      trigger: 'item',
    },
    ...themeConfig.series,

    name: title,
    type: 'radar',
    data: seriesObj_data,
  }

  let indicator = subNameList.map(subName => {
    return {
      name: subName,
    }
  })

  const options = {
    backgroundColor: themeConfig.backgroundColor,
    color: themeConfig.color,
    title: {
      ...themeConfig.title,
      text: title,
    },
    // 图例组件
    legend: {
      ...themeConfig.legend,
      data: mingchengList,
    },
    // 提示框组件
    tooltip: {
      trigger: 'axis',
      ...themeConfig.tooltip,
    },
    radar: {
      radius: '75%', // 6.0.0配置不是默认75?
      ...themeConfig.radar,
      indicator,
    },
    series: [seriesObj],
  }

  return options
}

// 辅助函数：异步加载图片
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    // http://codegen.caihongy.cn/ 不知道为啥不支持跨域，尝试改为https
    // img.src = src.replace(/^http:/, 'https:')
    img.src = src

    img.onload = () => resolve(img)
    img.onerror = err => reject(new Error(`图片加载失败`))
  })
}

export default getInitOptions
