/* ========================================
   QYServer 全站公共 JS
   包含：导航栏滚动、音乐控制、弹窗、平滑滚动、动态加载 Twikoo 评论等
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
            }, 400);
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
        const PAUSE_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM3ptMTAgNnYtMTJIMTB2MTJsMy41IDMuNS0yIDEuNS02LTYgNi02IDIgMS41LTMuNSAzLjV6Ii8+PC9zdmc+";
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

    // ---------- 动态加载 Twikoo 并初始化 ----------
    function loadTwikoo() {
        if (typeof twikoo !== 'undefined') {
            initTwikoo();
            return;
        }
        var script = document.createElement('script');
        script.src = 'https://s4.zstatic.net/npm/twikoo@1.7.3/dist/twikoo.min.js';
        script.onload = function () {
            initTwikoo();
        };
        script.onerror = function () {
            console.error('Twikoo 脚本加载失败，请检查网络或链接');
        };
        document.head.appendChild(script);
    }

    function initTwikoo() {
        if (typeof twikoo !== 'undefined') {
            twikoo.init({
                el: '#tcomment',
                envId: 'https://plapi.qyserver.cc',
                path: window.location.pathname,
                pageview: true
            });
        } else {
            console.warn('Twikoo 未能正确加载，无法初始化评论');
        }
    }

    // ---------- 初始化所有功能 ----------
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMusicControl();
        initSmoothScroll();
        initResetPopup();
        loadTwikoo();
    });
    
})();