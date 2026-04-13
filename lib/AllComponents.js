// /lib/AllComponents.js
(function () {
    // 创建加载动画的 HTML
    const loaderHTML = `
        <div id="page-loader" style="
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.4s ease;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 5px solid rgba(248, 165, 194, 0.3);
                    border-top-color: #f8a5c2;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin: 0 auto 20px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                "></div>
                <p style="
                    color: #fff; 
                    font-size: 18px; 
                    font-weight: bold; 
                    letter-spacing: 2px;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                ">加载中...</p>
            </div>
        </div>
    `;

    // 导航栏 HTML
    const navbarHTML = `
        <div id="menu-box">
            <div class="menu">
                <div class="logo">
                    <h2><a href="/"><i class="fas fa-cube"></i> QYServer</a></h2>
                </div>
                <div class="nav-links">
                    <a href="/download/"><i class="fas fa-download"></i>下载</a>
                    <a href="/search/"><i class="fas fa-search"></i>查询</a>
                    <a href="/updatelog/"><i class="fas fa-history"></i>更新</a>
                    <a href="/map/"><i class="fas fa-map"></i> 地图</a>
                    <a href="/faq/"><i class="fas fa-question-circle"></i> FAQ</a>
                    <a href="/about/"><i class="fas fa-info-circle"></i> 关于</a>
                </div>
            </div>
        </div>
    `;

    // 页脚 HTML
    const footerHTML = `
        <footer id="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>关于我们</h3>
                    <p>QYServer是一个专注于Minecraft基岩版的生存服务器，提供稳定、有趣的游戏环境，让玩家可以自由建造、探索和社交。</p>
                </div>
                <div class="footer-section">
                    <h3>快速链接</h3>
                    <div class="footer-links">
                        <a href="/rules/"><i class="fas fa-arrow-right"></i> 服务器规则</a>
                        <a href="/command/"><i class="fas fa-arrow-right"></i> 服务器指令</a>
                        <a href="/updatelog/"><i class="fas fa-arrow-right"></i> 更新日志</a>
                        <a href="/map/"><i class="fas fa-arrow-right"></i> 网页地图</a>
                        <a href="/faq/"><i class="fas fa-arrow-right"></i> 常见问题</a>
                        <a href="/about/"><i class="fas fa-arrow-right"></i> 关于</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>联系我们</h3>
                    <div class="footer-links">
                        <a href="mailto:qy@qyserver.cc"><i class="fas fa-envelope"></i> qy@qyserver.cc</a>
                        <a href="https://qm.qq.com/q/Ur5Pf31XMG"><i class="fab fa-qq"></i> QQ群: 1029879634</a>
                        <a href="https://discord.gg/WGcKjt7BNG"><i class="fab fa-discord"></i> Discord</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <a href="/bot/" target="_blank">Uptime Robot</a> | 
                <a href="https://github.com/weishao22/Qy-server" target="blank">
                    &copy; 2025-2026 QYServer 版权所有
                </a>
            </div>
        </footer>
    `;

    // 音乐控制 HTML
    const musicHTML = `
        <audio id="bgMusic" loop>
            <source src="https://qycloudrevetermux.s.odn.cc/f/d/lODc6/Motions.mp3" type="audio/mpeg">
        </audio>
        <div id="musicControl">
            <img id="musicIcon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM1ptMTAtMi41VjNIMTB2MTMuNWwtMi41LTIuNS0yIDIgNSA1IDUtNVY2LjV6Ii8+PC9zdmc+" alt="音乐控制">
        </div>
    `;

    // 添加旋转动画的 keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    // 立即注入加载动画，避免网络慢时先显示页面再显示加载动画
    try {
        if (!document.getElementById('page-loader')) {
            // document.write 在解析阶段能保证最早插入 loader
            document.write(loaderHTML);
        }
    } catch (e) {
        // 如果 document.write 不可用（例如脚本被延迟执行），回退到在 body 可用时插入
        if (document.body && !document.getElementById('page-loader')) {
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        } else {
            document.addEventListener('readystatechange', function () {
                if (document.body && !document.getElementById('page-loader')) {
                    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
                }
            });
        }
    }

    // 注入到页面（导航栏与页脚在 DOMContentLoaded 时注入；加载动画已尽早插入）
    document.addEventListener('DOMContentLoaded', function () {
        // 在 body 开头插入导航栏
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        // 在 body 结尾插入页脚和音乐控制
        document.body.insertAdjacentHTML('beforeend', footerHTML + musicHTML);
        // 加载动画已通过 document.write 注入，DOMContentLoaded 中不再重复插入
    });
})();