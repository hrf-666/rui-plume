#cd hch-blog # 打开项目

# 确保脚本抛出遇到的错误
set -e

pnpm docs:build # 生成静态文件

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A #添加当前目录所有文件
git commit -m "自动部署" #提交文件

git push -f git@github.com:hrf-666/rui-plume.git master:rui-pages

cd -
