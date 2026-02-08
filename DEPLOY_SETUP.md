# 自动部署配置指南

## 工作流程

```
本地修改代码 → git push → GitHub 自动触发 Actions → 自动部署到腾讯云服务器
```

## 第一步：配置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets（Settings → Secrets and variables → Actions）：

### 必需的 Secrets：

1. **REMOTE_HOST** - 腾讯云服务器 IP 地址
   - 例如：`123.456.789.0`

2. **REMOTE_USER** - SSH 用户名
   - 例如：`root` 或 `ubuntu`

3. **SSH_PRIVATE_KEY** - SSH 私钥
   - 生成方法：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   # 将 ~/.ssh/id_rsa.pub 内容添加到服务器的 ~/.ssh/authorized_keys
   # 将 ~/.ssh/id_rsa 的完整内容复制到 GitHub Secrets
   ```

### 可选的 Secrets：

4. **REMOTE_PORT** - SSH 端口（默认 22）
   - 如果使用非标准端口，设置此项

## 第二步：解决 Git Push 问题

如果遇到连接超时问题，可以尝试以下方法：

### 方法 1：配置代理（如果使用代理）

```bash
# 设置 HTTP 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方法 2：使用 SSH 方式（推荐）

```bash
# 切换到 SSH URL
git remote set-url origin git@github.com:fincflow/risk_management_enterprise.git

# 确保 SSH 密钥已添加到 ssh-agent
ssh-add ~/.ssh/id_rsa
```

### 方法 3：增加超时和缓冲区（已配置）

已自动配置：
- `http.timeout=300` (5分钟超时)
- `http.postBuffer=524288000` (500MB 缓冲区)
- `http.version=HTTP/1.1`

## 第三步：测试部署

1. 修改代码后提交：
   ```bash
   git add .
   git commit -m "测试自动部署"
   git push origin main
   ```

2. 在 GitHub 查看 Actions：
   - 访问：`https://github.com/fincflow/risk_management_enterprise/actions`
   - 查看部署状态

3. 验证服务：
   ```bash
   # SSH 到服务器检查
   ssh user@your-server-ip
   ps aux | grep uvicorn
   curl http://localhost:8000/health
   ```

## 服务器端要求

- Python 3.8+
- pip3
- 开放 8000 端口（或你配置的端口）
- SSH 访问权限

## 故障排查

### 如果 Actions 失败：

1. 检查 Secrets 是否正确配置
2. 检查服务器 SSH 连接是否正常
3. 查看 Actions 日志中的错误信息
4. 确保服务器有足够的磁盘空间和权限

### 如果服务无法启动：

```bash
# SSH 到服务器查看日志
ssh user@your-server-ip
tail -f /home/fincflow/app/log.txt

# 手动启动测试
cd /home/fincflow/app/risk_management_enterprise
source venv/bin/activate
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```
