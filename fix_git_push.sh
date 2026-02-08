#!/bin/bash

# Git Push 问题修复脚本

echo "🔧 正在配置 Git 以解决推送问题..."

# 1. 增加超时时间
git config http.timeout 300
echo "✅ 已设置 HTTP 超时时间为 300 秒"

# 2. 禁用低速度限制
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 0
echo "✅ 已禁用低速度限制"

# 3. 使用 HTTP/1.1
git config http.version HTTP/1.1
echo "✅ 已切换到 HTTP/1.1"

# 4. 增加 POST 缓冲区
git config http.postBuffer 1048576000
echo "✅ 已增加 POST 缓冲区到 1GB"

echo ""
echo "📋 当前 Git 配置："
git config --list | grep -E "(http|timeout)" | grep -v "^remote"

echo ""
echo "💡 如果仍然无法推送，可以尝试："
echo "   1. 使用 SSH 方式：git remote set-url origin git@github.com:fincflow/risk_management_enterprise.git"
echo "   2. 配置代理（如果使用）：git config --global http.proxy http://proxy:port"
echo "   3. 检查网络连接：ping github.com"
echo ""
echo "现在可以尝试：git push"
