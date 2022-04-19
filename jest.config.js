module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  'collectCoverage': false,
  // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件，根据个人项目自己配置
  'collectCoverageFrom': [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/App.vue',
    '!**/node_modules/**'
  ],
  'coverageReporters': ['html', 'text-summary'] // 生成覆盖率报告文件类型
}
