/* ========================================
   QYServer 全站公共 JS
   包含：导航栏滚动、音乐控制、弹窗、平滑滚动等
   ======================================== */

(function () {
    'use strict';
    // 页面加载完成后隐藏动画
    window.addEventListener('load', function () {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 400); // 等淡出动画完成后再移除
        }
    });

    // ---------- 导航栏滚动效果 ----------
    function initNavbarScroll() {
        const menuBox = document.getElementById('menu-box');
        const banner = document.getElementById('banner');
        if (!menuBox || !banner) return;

        window.addEventListener('scroll', function () {
            const bannerHeight = banner.offsetHeight;
            if (window.scrollY > bannerHeight * 0.2) {
                menuBox.classList.add('scrolled');
            } else {
                menuBox.classList.remove('scrolled');
            }
        });
    }

    // ---------- 音乐播放控制 ----------
    function initMusicControl() {
        const bgMusic = document.getElementById('bgMusic');
        const musicControl = document.getElementById('musicControl');
        const musicIcon = document.getElementById('musicIcon');
        if (!bgMusic || !musicControl || !musicIcon) return;

        let musicPlaying = false;

        // 完整的暂停图标 Base64
        const PAUSE_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM3ptMTAgNnYtMTJIMTB2MTJsMy41IDMuNS0yIDEuNS02LTYgNi02IDIgMS41LTMuNSAzLjV6Ii8+PC9zdmc+";

        // 完整的播放图标 Base64
        const PLAY_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM1ptMTAtMi41VjNIMTB2MTMuNWwtMi41LTIuNS0yIDIgNSA1IDUtNVY2LjV6Ii8+PC9zdmc+";

        musicControl.addEventListener('click', function () {
            if (musicPlaying) {
                bgMusic.pause();
                musicIcon.src = PAUSE_ICON;
            } else {
                bgMusic.play().catch(e => console.log("播放失败:", e));
                musicIcon.src = PLAY_ICON;
            }
            musicPlaying = !musicPlaying;
        });
    }

    // ---------- 平滑滚动 ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ---------- 重置弹窗按钮 ----------
    function initResetPopup() {
        const resetBtn = document.getElementById('resetPopup');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('dontShowPopu');
            alert('弹窗设置已重置，下次访问时将再次显示提示');
        });
    }

    // ---------- 加载超时弹窗（20s） ----------
    (function initLoadTimeoutPopup() {
        const TIMEOUT_MS = 20000; // 20秒
        let loadTimeoutTimer = null;

        function showLoadTimeoutPopup() {
            try {
                let overlay = document.getElementById('popupOverlay');
                // 如果没有现成的弹窗容器，创建最小结构（尽量不修改 HTML）
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'popup-overlay';
                    overlay.id = 'popupOverlay';
                    const content = document.createElement('div');
                    content.className = 'popup-content';
                    overlay.appendChild(content);
                    document.body.appendChild(overlay);
                }

                const content = overlay.querySelector('.popup-content') || overlay;

                // 备份原始内容，便于关闭时恢复
                if (!overlay.dataset.qyOriginal) {
                    overlay.dataset.qyOriginal = content.innerHTML || '';
                }

                content.innerHTML = '' +
                    '<div class="popup-title"><h2>加载超时</h2></div>' +
                    '<div class="popup-message"><p>页面加载超过20秒，可能网络较慢或资源卡住。请尝试刷新页面。</p></div>' +
                    '<div class="popup-footer"><button class="popup-btn popup-refresh">刷新</button>' +
                    '<button class="popup-btn popup-close">关闭</button></div>';

                overlay.style.display = 'flex';
                document.body.classList.add('no-scroll');

                const btnRefresh = overlay.querySelector('.popup-refresh');
                const btnClose = overlay.querySelector('.popup-close');

                if (btnRefresh) btnRefresh.addEventListener('click', function () { location.reload(); });
                if (btnClose) btnClose.addEventListener('click', function () {
                    overlay.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    // 恢复原始内容
                    if (overlay.dataset.qyOriginal) {
                        const c = overlay.querySelector('.popup-content');
                        if (c) c.innerHTML = overlay.dataset.qyOriginal;
                    }
                });
            } catch (e) {
                console.error('显示加载超时弹窗失败', e);
            }
        }

        function clearLoadTimeout() {
            if (loadTimeoutTimer) {
                clearTimeout(loadTimeoutTimer);
                loadTimeoutTimer = null;
            }
        }

        // 立即启动计时器：如果页面在 20s 内完成加载则清理计时器，否则显示弹窗
        if (document.readyState === 'complete') {
            clearLoadTimeout();
        } else {
            loadTimeoutTimer = setTimeout(function () {
                if (document.readyState !== 'complete') {
                    showLoadTimeoutPopup();
                }
            }, TIMEOUT_MS);

            window.addEventListener('load', function () {
                clearLoadTimeout();
            });
        }

        // 暴露清理函数（调试用）
        window.__qy_clearLoadTimeout = clearLoadTimeout;
    })();

    // ---------- 初始化所有功能 ----------
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMusicControl();
        initSmoothScroll();
        initResetPopup();
    });

})();