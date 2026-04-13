// /lib/components.js
(function () {
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

    // 注入到页面
    document.addEventListener('DOMContentLoaded', function () {
        // 在 body 开头插入导航栏
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        // 在 body 结尾插入页脚和音乐控制
        document.body.insertAdjacentHTML('beforeend', footerHTML + musicHTML);
    });
})();